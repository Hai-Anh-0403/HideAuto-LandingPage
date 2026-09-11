# Downloads feature

- Owns the public release contract, release lookup, and later download-intent behavior.
- A missing, invalid, or unavailable release is represented by `null`; no component may construct a fallback download URL.
- The service accepts only the documented release channel, platform, and architecture values.
