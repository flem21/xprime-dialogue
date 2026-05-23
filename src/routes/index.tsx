import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageSquare, LineChart, BarChart3, Shield, Gift, Zap, Settings,
  ArrowRight, Send, Sparkles, ChevronDown, X,
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.jpg";

export const Route = createFileRoute("/")({ component: Index });

type TabId = "chat" | "portfolio" | "markets" | "risk" | "sponsor" | "evm" | "settings";

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "portfolio", label: "Portfolio", icon: LineChart },
  { id: "markets", label: "Markets", icon: BarChart3 },
  { id: "risk", label: "Risk", icon: Shield },
  { id: "sponsor", label: "Sponsor", icon: Gift },
  { id: "evm", label: "EVM", icon: Zap },
  { id: "settings", label: "Settings", icon: Settings },
];

function Index() {
  const [tab, setTab] = useState<TabId>("chat");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingHeader />
      <FloatingTabs active={tab} onChange={setTab} />

      <main className="mx-auto max-w-7xl px-6 pb-32 pt-32">
        {tab === "chat" && <Hero onStart={() => setTab("chat")} />}
        <section className="mt-10">
          {tab === "chat" && <ChatPanel />}
          {tab === "portfolio" && <PortfolioPanel />}
          {tab === "markets" && <MarketsPanel />}
          {tab === "risk" && <RiskPanel />}
          {tab === "sponsor" && <SponsorPanel />}
          {tab === "evm" && <EvmPanel />}
          {tab === "settings" && <SettingsPanel />}
        </section>
      </main>

      <footer className="border-t border-foreground/10 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-xs text-muted-foreground">
          <span>xPrime · built on Injective</span>
          <a href="#" className="inline-flex items-center gap-1 hover:text-foreground">formfrom.design <ArrowRight className="h-3 w-3" /></a>
        </div>
      </footer>
    </div>
  );
}

/* ───────── Floating header ───────── */
function FloatingHeader() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-foreground/10 bg-background/80 px-5 py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="leading-none">
            <div className="font-serif text-lg">xPrime</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Intent trading</div>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#product" className="hover:opacity-70">Product</a>
          <a href="#services" className="hover:opacity-70">Services</a>
          <a href="#about" className="hover:opacity-70">About us</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-1.5 rounded-full border border-foreground/15 px-3 py-1.5 text-xs sm:inline-flex">
            Testnet <ChevronDown className="h-3 w-3" />
          </button>
          <button className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background hover:opacity-90">
            Connect wallet
          </button>
        </div>
      </div>
    </header>
  );
}

/* ───────── Floating tabs (replacing sidebar) ───────── */
function FloatingTabs({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <div className="fixed inset-x-0 top-20 z-40 px-4">
      <div className="mx-auto flex max-w-7xl justify-center">
        <div className="flex items-center gap-1 rounded-full border border-foreground/10 bg-card/90 p-1 shadow-[0_10px_40px_-25px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs transition ${
                  isActive ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────── Hero ───────── */
function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative grid items-stretch overflow-hidden rounded-[2rem] border border-foreground/10 bg-cream md:grid-cols-2">
      <div className="relative bg-mustard p-8 md:p-12">
        <div className="absolute left-8 top-8 text-xs">
          <div className="font-semibold">Connect &amp; Trade</div>
          <div className="text-foreground/60">Illustrations</div>
        </div>
        <img
          src={heroImg}
          alt="Isometric trading desk with phone, coffee machine and croissant"
          width={1280}
          height={960}
          className="mt-12 w-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-14">
        <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
          Start your day <span className="italic">the right way.</span>
        </h1>
        <p className="mt-5 max-w-md text-base text-muted-foreground">
          Take a moment to enjoy your morning with a chart, a chat, and a cup of coffee. Trade Injective in plain English.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button onClick={onStart} className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background hover:opacity-90">
            Let&apos;s trade? <ArrowRight className="h-4 w-4" />
          </button>
          <span className="text-xs text-muted-foreground">Dry-run by default · No private keys</span>
        </div>
      </div>
    </section>
  );
}

/* ───────── Chat ───────── */
function ChatPanel() {
  const [dryRun, setDryRun] = useState(true);
  const [msg, setMsg] = useState("");
  const messages = [
    { role: "user", text: "earn yield on $500" },
    { role: "agent", strategy: "EARN_CARRY", reasoning: "Delta-neutral basis trade between INJ spot and INJ-PERP funding.", amount: "$500", leverage: "—" },
    { role: "user", text: "what's the price of BTC" },
    { role: "agent", inline: "CHECK_PRICE → $62,431.20" },
  ];

  return (
    <Card title="Chat with xPrime" subtitle="Tell it your goal. It'll plan, then ask before it trades.">
      <div className="flex flex-col gap-4">
        <div className="max-h-[420px] space-y-4 overflow-y-auto rounded-2xl bg-muted/40 p-5">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-4 py-2.5 text-sm text-background">{m.text}</div>
              </div>
            ) : "inline" in m ? (
              <div key={i} className="max-w-[80%] rounded-2xl rounded-bl-sm bg-card px-4 py-2.5 text-sm">{m.inline}</div>
            ) : (
              <div key={i} className="max-w-[85%] rounded-2xl rounded-bl-sm border border-foreground/10 bg-card p-4">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-mustard px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Strategy · {m.strategy}
                </div>
                <p className="text-sm text-muted-foreground">{m.reasoning}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs">
                  <span><span className="text-muted-foreground">Amount</span> <b>{m.amount}</b></span>
                  <span><span className="text-muted-foreground">Leverage</span> <b>{m.leverage}</b></span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-full bg-foreground px-3.5 py-1.5 text-xs text-background">Execute</button>
                  <button className="rounded-full border border-foreground/15 px-3.5 py-1.5 text-xs">Edit</button>
                  <button className="rounded-full px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground">Discard</button>
                </div>
              </div>
            )
          )}
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-card p-3">
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type your financial goal… (e.g. hedge my ETH bag)"
            rows={2}
            className="w-full resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between border-t border-foreground/10 pt-2">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={dryRun} onChange={(e) => setDryRun(e.target.checked)} className="accent-foreground" />
              Dry-run mode (recommended)
            </label>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs text-background">
              Send <Send className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ───────── Portfolio ───────── */
function PortfolioPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card title="Balances">
        <ul className="space-y-2 text-sm">
          <Row label="INJ" value="12.4521" />
          <Row label="USDT" value="250.00" />
          <Row label="ATOM" value="4.10" />
        </ul>
      </Card>
      <Card title="Subaccount" subtitle="0xa89bff…000000">
        <ul className="space-y-2 text-sm">
          <Row label="USDT deposit" value="100.00" />
          <Row label="INJ deposit" value="5.00" />
        </ul>
      </Card>
      <Card title="Health" accent>
        <div className="font-serif text-5xl">1.42</div>
        <p className="mt-1 text-xs text-muted-foreground">Aggregate health factor across positions</p>
      </Card>

      <Card title="Open positions" className="lg:col-span-3">
        <Table
          head={["Market", "Side", "Qty", "Entry", "Mark", "PnL", "HF", "Liq."]}
          rows={[
            ["BTC-PERP", "LONG", "0.01", "60,000", "62,431", "+24.31", "1.42", "53,120"],
            ["ETH-PERP", "SHORT", "0.5", "3,200", "3,150", "+25.00", "2.11", "3,450"],
          ]}
        />
      </Card>

      <Card title="Open orders" className="lg:col-span-3" action={<button className="rounded-full border border-foreground/15 px-3 py-1 text-xs">Cancel all</button>}>
        <Table
          head={["Type", "Side", "Market", "Price", "Qty", "Hash", ""]}
          rows={[
            ["SPOT", "BUY", "INJ/USDT", "23.00", "10", "0xab…", "✕"],
            ["PERP", "SELL", "BTC-PERP", "60,000", "0.01", "0xcd…", "✕"],
          ]}
        />
      </Card>
    </div>
  );
}

/* ───────── Markets ───────── */
function MarketsPanel() {
  const prices = [
    ["INJ", "$23.41", "+1.2%"], ["BTC", "$62,431", "-0.4%"],
    ["ETH", "$3,150", "+0.8%"], ["SOL", "$156.20", "+2.1%"],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="Oracle prices" className="lg:col-span-2">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {prices.map(([s, p, c]) => (
            <div key={s} className="rounded-xl bg-muted/50 p-4">
              <div className="text-xs text-muted-foreground">{s}</div>
              <div className="mt-1 font-serif text-2xl">{p}</div>
              <div className={`text-xs ${c.startsWith("+") ? "text-emerald-700" : "text-rose-700"}`}>{c}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Funding rates">
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between"><span>BTC-PERP</span><span className="text-emerald-700">+0.0012% / hr</span></li>
          <li className="flex justify-between"><span>ETH-PERP</span><span className="text-rose-700">−0.0008% / hr</span></li>
        </ul>
      </Card>
      <Card title="Order book · BTC-PERP">
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div>
            <div className="mb-1 text-muted-foreground">Bids</div>
            {[["62425","0.500"],["62420","1.200"],["62410","0.300"]].map(([p,q]) => (
              <div key={p} className="flex justify-between rounded bg-emerald-500/10 px-2 py-1"><span>{p}</span><span>{q}</span></div>
            ))}
          </div>
          <div>
            <div className="mb-1 text-muted-foreground">Asks</div>
            {[["62435","0.420"],["62440","0.800"],["62445","1.500"]].map(([p,q]) => (
              <div key={p} className="flex justify-between rounded bg-rose-500/10 px-2 py-1"><span>{p}</span><span>{q}</span></div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ───────── Risk ───────── */
function RiskPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="Auto-protection">
        <div className="space-y-4 text-sm">
          <ToggleRow label="Auto top-up margin" hint="When HF dips, push more USDT." />
          <Field label="Trigger HF below" defaultValue="1.30" />
          <Field label="Top-up amount (USDT)" defaultValue="50" />
          <div className="border-t border-foreground/10" />
          <ToggleRow label="Auto cancel on danger" hint="Cancel open orders before liquidation." />
          <Field label="Danger HF" defaultValue="1.05" />
          <Field label="Poll interval (s)" defaultValue="30" />
          <div className="flex gap-2 pt-2">
            <button className="rounded-full bg-foreground px-4 py-1.5 text-xs text-background">Start monitor</button>
            <button className="rounded-full border border-foreground/15 px-4 py-1.5 text-xs">Stop</button>
            <span className="ml-auto text-xs text-muted-foreground">Status: <b className="text-foreground">Running</b></span>
          </div>
        </div>
      </Card>
      <Card title="Stop-loss / Take-profit">
        <div className="space-y-3 text-sm">
          <Field label="Position" defaultValue="BTC-PERP LONG" />
          <div className="flex gap-4 text-xs">
            <label className="flex items-center gap-1.5"><input type="radio" name="k" defaultChecked /> Stop loss</label>
            <label className="flex items-center gap-1.5"><input type="radio" name="k" /> Take profit</label>
          </div>
          <Field label="Trigger price" placeholder="55000" />
          <Field label="Notional (USDT)" placeholder="200" />
          <button className="mt-2 rounded-full bg-foreground px-4 py-2 text-xs text-background">Arm trigger</button>
        </div>
      </Card>
    </div>
  );
}

/* ───────── Sponsor ───────── */
function SponsorPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="Sponsor gas" subtitle="Let someone trade Injective without holding INJ. You pay up to the limit.">
        <div className="space-y-3">
          <Field label="Grantee address" placeholder="inj1…" />
          <Field label="Spend limit (INJ)" defaultValue="1.0" />
          <Field label="Expires in (days)" defaultValue="30" />
          <button className="mt-2 rounded-full bg-foreground px-4 py-2 text-xs text-background">Grant allowance</button>
        </div>
      </Card>
      <Card title="Active allowances">
        <Table
          head={["Grantee", "Limit", "Expires", ""]}
          rows={[["inj1abc…", "1 INJ", "in 27 days", "Revoke"]]}
        />
      </Card>
    </div>
  );
}

/* ───────── EVM ───────── */
function EvmPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="EVM precompile" subtitle="Read your subaccount deposit via the cross-VM Exchange precompile at 0x65.">
        <div className="space-y-3 text-sm">
          <Field label="RPC URL" defaultValue="https://k8s.testnet.json-rpc.injective.network" />
          <Field label="Chain ID" defaultValue="1439" />
          <Field label="Precompile" defaultValue="0x0000000000000000000000000000000000000065" />
          <Field label="Denom" defaultValue="peggy0x87aB3B… (USDT)" />
          <button className="mt-2 rounded-full bg-foreground px-4 py-2 text-xs text-background">Read deposit</button>
        </div>
      </Card>
      <Card title="Last response" accent>
        <ul className="space-y-2 font-mono text-sm">
          <Row label="Available" value="0.000000000000100000 USDT" />
          <Row label="Total" value="0.000000000000100000 USDT" />
        </ul>
      </Card>
    </div>
  );
}

/* ───────── Settings ───────── */
function SettingsPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="Network &amp; AI">
        <div className="space-y-3 text-sm">
          <Field label="Network" defaultValue="Testnet" />
          <Field label="AI provider" defaultValue="gemini" />
          <Field label="API key" type="password" placeholder="••••••••" />
          <Field label="Model" defaultValue="claude-haiku-4-5" />
        </div>
      </Card>
      <Card title="Overrides">
        <div className="space-y-3 text-sm">
          <Field label="Spot market ID" placeholder="optional" />
          <Field label="Derivative market ID" placeholder="optional" />
          <Field label="EVM RPC URL" placeholder="optional" />
          <p className="pt-2 text-xs text-muted-foreground">Never expose private keys in the UI — signing happens via Keplr.</p>
        </div>
      </Card>
    </div>
  );
}

/* ───────── Primitives ───────── */
function Card({
  title, subtitle, children, className = "", action, accent = false,
}: {
  title: string; subtitle?: string; children: React.ReactNode;
  className?: string; action?: React.ReactNode; accent?: boolean;
}) {
  return (
    <div className={`rounded-3xl border border-foreground/10 ${accent ? "bg-mustard" : "bg-card"} p-6 md:p-7 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl leading-tight">{title}</h3>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between border-b border-foreground/5 pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </li>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {head.map((h) => <th key={h} className="pb-3 pr-4 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-foreground/5">
              {r.map((c, j) => (
                <td key={j} className="py-3 pr-4">
                  {c === "✕" ? <button className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button> : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Field({
  label, defaultValue, placeholder, type = "text",
}: { label: string; defaultValue?: string; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm outline-none focus:border-foreground/40"
      />
    </label>
  );
}

function ToggleRow({ label, hint }: { label: string; hint: string }) {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition ${on ? "bg-foreground" : "bg-foreground/20"}`}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
