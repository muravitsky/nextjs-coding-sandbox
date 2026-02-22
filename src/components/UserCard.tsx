interface Props {
  readonly name: string;
  readonly bio: string;
}

export function UserCard({ name, bio }: Props) {
  return (
    <div className="rounded border p-4">
      <h2 className="font-bold">{name}</h2>
      <p>{bio}</p>
    </div>
  );
}
