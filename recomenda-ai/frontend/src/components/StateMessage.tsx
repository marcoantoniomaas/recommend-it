interface Props {
  title: string;
  description?: string;
}

export function StateMessage({ title, description }: Props) {
  return (
    <div className="noir-panel rounded-sm px-6 py-16 text-center">
      <h3 className="noir-title text-2xl text-foreground">{title}</h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
