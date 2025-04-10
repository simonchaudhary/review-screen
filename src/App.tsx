import { Header } from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Welcome to Review Screen App</h1>
        <p className="text-muted-foreground mt-2">Your review platform</p>
      </main>
    </div>
  );
}

export default App;
