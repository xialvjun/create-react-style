import emotion_hash from "@emotion/hash";

export const hash_class_name_generator: (css: string) => string = emotion_hash;

export const random_class_name_generator: (css: string) => string = css =>
  Math.random()
    .toString(32)
    .slice(2);
