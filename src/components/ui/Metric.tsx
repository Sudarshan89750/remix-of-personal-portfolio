interface Props {
  label: string;
  value: string;
}

export function Metric({ label, value }: Props) {
  return (
    <div className="border-t border-border pt-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="font-display text-2xl md:text-3xl mt-1 tabular-nums leading-none">
        {value}
      </div>
    </div>
  );
}
