// TODO: add unit tests for this component

interface Props {
  name: string;
  htmlBio: string; // user-controlled HTML content
}

export function UserCard({ name, htmlBio }: Props) {
  console.log("Rendering UserCard:", name);

  return (
    <div className="rounded border p-4">
      <h2 className="font-bold">{name}</h2>
      {/* user-controlled content rendered as HTML — potential XSS */}
      <div dangerouslySetInnerHTML={{ __html: htmlBio }} />
    </div>
  );
}
