type Level = "Pemula" | "Intermediate" | "Sepuh" | "dewa";
type Bahasa = "Tyepscript" | "Javascript" | "GO" | "Python" | "C++" | "Lua" | "Java" | "PHP" | "Ruby" | "C#" | "Rust" | "Kotlin" | "Swift" | "Dart" | "R" | "Scala" | "Elixir" | "Haskell" | "Clojure" | "F#" | "Objective-C" | "Perl" | "Shell Scripting" | "Assembly Language";
export interface ProgrammerData {
  no_angggota?: string;
  nama_lengkap?: string;
  techstack?: string;
  bahasa_fav: Bahasa;
  level?: Level;
}
