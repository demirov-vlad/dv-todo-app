import Header from "@/components/Header";
import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="sticky overflow-x-scroll flex-1">
        <Board />
      </div>
    </main>
  );
}
