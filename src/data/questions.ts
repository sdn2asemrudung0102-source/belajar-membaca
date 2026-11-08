import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    q: "Huruf vokal dalam abjad adalah ...",
    opts: {
      a: "b, c, d, f",
      b: "a, i, u, e, o",
      c: "g, h, j, k"
    },
    ans: "b",
    category: "Huruf Vokal",
    explanation: "Huruf vokal (huruf hidup) ada 5, yaitu: a, i, u, e, o. Huruf lainnya disebut huruf konsonan (huruf mati).",
    hint: "Ingat nyanyian: A - I - U - E - O!",
    icon: "🗣️"
  },
  {
    id: 2,
    q: 'Kata "BUKU" memiliki huruf vokal ...',
    opts: {
      a: "b dan k",
      b: "u dan u",
      c: "b dan u"
    },
    ans: "b",
    category: "Huruf Vokal",
    explanation: 'Pada kata B-U-K-U, huruf "u" adalah huruf vokal. Huruf "b" dan "k" adalah huruf konsonan.',
    hint: 'B-U-K-U memiliki huruf vokal "u" dua kali.',
    icon: "📚"
  },
  {
    id: 3,
    q: "Manakah yang termasuk huruf konsonan?",
    opts: {
      a: "a, i, u",
      b: "e, o, a",
      c: "b, c, d"
    },
    ans: "c",
    category: "Huruf Konsonan",
    explanation: 'Huruf b, c, d adalah huruf konsonan. Pilihan a dan b berisi huruf vokal (a, i, u, e, o).',
    hint: 'Huruf konsonan adalah huruf selain a, i, u, e, o.',
    icon: "🔤"
  },
  {
    id: 4,
    q: 'Kata "MEJA" diawali dengan huruf konsonan ...',
    opts: {
      a: "m",
      b: "e",
      c: "a"
    },
    ans: "a",
    category: "Huruf Konsonan",
    explanation: 'Kata MEJA diawali oleh huruf "M". Huruf M adalah huruf konsonan, sedangkan E dan A adalah vokal.',
    hint: 'Lihat huruf paling pertama di kata "MEJA".',
    icon: "🪑"
  },
  {
    id: 5,
    q: 'Huruf "i" termasuk huruf ...',
    opts: {
      a: "konsonan",
      b: "vokal",
      c: "diftong"
    },
    ans: "b",
    category: "Huruf Vokal",
    explanation: 'Huruf "i" termasuk dalam kelompok 5 huruf vokal (a, i, u, e, o).',
    hint: 'Huruf hidup yang berbunyi seperti kata "ikan".',
    icon: "💡"
  },
  {
    id: 6,
    q: 'Suku kata dari kata "BOLA" adalah ...',
    opts: {
      a: "bo - la",
      b: "bol - a",
      c: "b - ola"
    },
    ans: "a",
    category: "Suku Kata",
    explanation: 'Kata BOLA diucapkan dalam dua ketukan: "bo" dan "la", sehingga suku katanya adalah bo - la.',
    hint: 'Ucapkan pelan-pelan: BO ... LA!',
    icon: "⚽"
  },
  {
    id: 7,
    q: 'Kata "CICAK" terdiri dari ... suku kata',
    opts: {
      a: "1",
      b: "2",
      c: "3"
    },
    ans: "b",
    category: "Suku Kata",
    explanation: 'Kata CICAK dipenggal menjadi ci - cak, jadi ada 2 suku kata.',
    hint: 'Tepuk tangan dua kali: CI (tepuk 1) - CAK (tepuk 2).',
    icon: "🦎"
  },
  {
    id: 8,
    q: 'Suku kata "bu" terdapat pada kata ...',
    opts: {
      a: "baju",
      b: "buku",
      c: "bola"
    },
    ans: "b",
    category: "Suku Kata",
    explanation: 'Kata BUKU diawali dengan suku kata "bu" (bu - ku). Sedangkan baju adalah ba - ju, dan bola adalah bo - la.',
    hint: 'Benda yang kita baca untuk belajar.',
    icon: "📖"
  },
  {
    id: 9,
    q: "Huruf b - u - k - u jika dirangkai menjadi ...",
    opts: {
      a: "bakau",
      b: "buku",
      c: "biku"
    },
    ans: "b",
    category: "Merangkai Kata",
    explanation: 'Jika kita gabungkan huruf b + u + k + u, bunyinya menjadi "buku".',
    hint: 'b + u = bu, k + u = ku -> buku!',
    icon: "📚"
  },
  {
    id: 10,
    q: "Huruf m - e - j - a jika dirangkai menjadi ...",
    opts: {
      a: "meja",
      b: "maja",
      c: "mija"
    },
    ans: "a",
    category: "Merangkai Kata",
    explanation: 'Jika dirangkai: m + e = me, j + a = ja -> meja.',
    hint: 'Tempat kita meletakkan buku saat belajar di kelas.',
    icon: "🪑"
  },
  {
    id: 11,
    q: "Huruf s - a - p - i jika dirangkai menjadi ...",
    opts: {
      a: "sepi",
      b: "sapu",
      c: "sapi"
    },
    ans: "c",
    category: "Merangkai Kata",
    explanation: 'Huruf s + a = sa, p + i = pi -> sapi (hewan penghasil susu segar).',
    hint: 'Hewan berkaki empat pemakan rumput yang bersuara "moo".',
    icon: "🐄"
  },
  {
    id: 12,
    q: 'Kata "SEPEDA" terdiri dari ... suku kata',
    opts: {
      a: "2",
      b: "3",
      c: "4"
    },
    ans: "b",
    category: "Suku Kata",
    explanation: 'Kata SEPEDA diuraikan menjadi: se - pe - da, totalnya ada 3 suku kata.',
    hint: 'Hitung suku katanya: se (1) - pe (2) - da (3).',
    icon: "🚲"
  },
  {
    id: 13,
    q: 'Huruf vokal pada kata "TOPI" adalah ...',
    opts: {
      a: "t dan p",
      b: "o dan i",
      c: "t dan o"
    },
    ans: "b",
    category: "Huruf Vokal",
    explanation: 'Pada kata TOPI, huruf "o" dan "i" adalah huruf vokal. Sedangkan "t" dan "p" adalah huruf konsonan.',
    hint: 'Cari huruf a, i, u, e, atau o di kata TOPI.',
    icon: "🧢"
  },
  {
    id: 14,
    q: 'Huruf konsonan pada kata "SAPU" adalah ...',
    opts: {
      a: "s dan p",
      b: "a dan u",
      c: "s dan a"
    },
    ans: "a",
    category: "Huruf Konsonan",
    explanation: 'Pada kata SAPU, huruf "s" dan "p" adalah konsonan. Huruf "a" dan "u" adalah vokal.',
    hint: 'Bukan huruf vokal: s dan p.',
    icon: "🧹"
  },
  {
    id: 15,
    q: "Huruf k - u - d - a jika dirangkai menjadi ...",
    opts: {
      a: "kuda",
      b: "kadu",
      c: "kudo"
    },
    ans: "a",
    category: "Merangkai Kata",
    explanation: 'Rangkaian k + u = ku, d + a = da -> kuda (hewan yang bisa berlari kencang).',
    hint: 'Hewan yang bisa ditunggangi dan bersuara ringkik.',
    icon: "🐎"
  }
];
