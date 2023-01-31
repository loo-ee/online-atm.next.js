export default function Bank({ params }: { params: { bank: string } }) {
  return <div>{params.bank}</div>;
}
