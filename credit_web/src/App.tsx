import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Terminal from "./pages/Terminal";
import CarbonMarket from "./pages/CarbonMarket";
import ACFCMarket from "./pages/ACFCMarket";
import OracleExplorer from "./pages/OracleExplorer";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/market/vcc" element={<CarbonMarket />} />
        <Route path="/market/acfc" element={<ACFCMarket />} />
        <Route path="/oracle" element={<OracleExplorer />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
