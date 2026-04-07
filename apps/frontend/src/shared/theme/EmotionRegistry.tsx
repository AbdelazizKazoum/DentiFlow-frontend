"use client";

import * as React from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

// This implementation ensures that Emotion cache styles are injected during SSR
// and hydrated correctly on the client, with dual cache support for RTL/LTR.

interface EmotionRegistryProps {
  children: React.ReactNode;
  direction: "rtl" | "ltr";
}

export default function EmotionRegistry({
  children,
  direction,
}: EmotionRegistryProps) {
  const [{ cache, flush }] = React.useState(() => {
    const isRtl = direction === "rtl";
    const emotionCache = createCache({
      key: isRtl ? "mui-rtl" : "mui-ltr",
      stylisPlugins: isRtl ? [prefixer, rtlPlugin] : [prefixer],
    });
    emotionCache.compat = true;
    const prevInsert = emotionCache.insert;
    let inserted: string[] = [];
    emotionCache.insert = (...args) => {
      const serialized = args[1];
      if (emotionCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flushCache = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache: emotionCache, flush: flushCache };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
