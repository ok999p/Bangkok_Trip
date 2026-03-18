import { ArrowRight, GitBranch } from "lucide-react";
import type { StationStep } from "@/data/transportData";

type StationStepperProps = {
  steps: StationStep[];
};

export function StationStepper({ steps }: StationStepperProps) {
  return (
    <ol className="space-y-2">
      {steps.map((step, index) => (
        <li
          key={`${step.line}-${step.from}-${step.to}-${index}`}
          className="rounded-xl border border-white/10 bg-slate-900/55 p-3 text-xs text-slate-200"
        >
          <p className="font-semibold text-cyan-200">{step.line}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-slate-300">
            {step.from}
            <ArrowRight className="h-3 w-3" />
            {step.to}
          </p>
          {step.transfer ? (
            <p className="mt-1 inline-flex items-center gap-1 text-violet-200">
              <GitBranch className="h-3 w-3" />
              จุดเปลี่ยนสาย: {step.transfer}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
