function random(max) {
    return Math.round(Math.random() * 1000) % max;
  }

  const A = [
    "bad", "best", "better", "big", "certain", "clear", "different", "early", "easy", "economic", "federal", "free", "full", "good",
    "great", "hard", "high", "human", "important", "international", "large", "late", "little", "local", "long", "low", "major", "military",
    "national", "new", "old", "only", "other", "political", "possible", "public", "real", "recent", "right", "small", "social", "special",
    "strong", "sure", "true", "white", "whole", "young", "crazy", "helpful", "mushy"
  ];
  const B = [
    "red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"
  ];
  const C = [
    "area", "book", "business", "case", "child", "company", "country", "day", "eye", "fact", "family", "government", "group", "hand", "home", "job",
    "life", "lot", "man", "money", "month", "mother", "Mr", "night", "number", "part", "people", "place", "point", "problem", "program", "question",
    "right", "room", "school", "state", "story", "student", "study", "system", "thing", "time", "water", "way", "week", "woman", "word", "work", "world", "year"
  ];

  const buildData = function (count) {
    let nextId = 1;
    const data = new Array(count);
    for (let i = 0; i < count; i++) {
      data[i] = {
        id: nextId++,
        label: `${A[random(A.length)]} ${B[random(B.length)]} ${C[random(C.length)]}`,
      };
    }
    return data;
  }

export default buildData;
