import "./App.css";
import { Header } from "./components/header/Header";
import { MenuPage } from "./components/menu";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <MenuPage />
      </main>
    </CartProvider>
  );
}

export default App;
