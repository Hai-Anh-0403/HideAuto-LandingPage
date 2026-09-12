import { Bot, Globe2, Link2, Play } from "lucide-react";

type AiWorkflowCanvasProps = Readonly<{ buildStep: number }>;

const cards = [
  { label: "Start", detail: "start", icon: Play },
  { label: "Open & Connect", detail: "newProfile", icon: Link2 },
  { label: "Go to URL", detail: "https://target.example", icon: Globe2 },
  { label: "AI LLM", detail: "Generate action", icon: Bot },
] as const;

export function AiWorkflowCanvas({ buildStep }: AiWorkflowCanvasProps) {
  return <div className="ai-generation-canvas" aria-label="AI-generated workflow canvas">
    <svg aria-hidden="true" className="ai-generation-canvas__edges" preserveAspectRatio="none" viewBox="0 0 100 100">
      {buildStep > 1 && <path d="M 23 24 C 31 26, 31 36, 39 39" />}
      {buildStep > 2 && <path d="M 47 47 C 55 49, 56 59, 63 62" />}
      {buildStep > 3 && <path d="M 71 70 C 78 72, 79 80, 85 83" />}
    </svg>
    {cards.slice(0, buildStep).map(({ label, detail, icon: Icon }, index) => <article className={`ai-generation-canvas__card card-${index + 1}`} key={label}><span><Icon size={15} /></span><div><b>{label}</b><small>{detail}</small></div></article>)}
    <span className="ai-generation-canvas__state">{buildStep === 0 ? "WAITING FOR AI" : `GENERATING · ${buildStep}/4`}</span>
  </div>;
}
