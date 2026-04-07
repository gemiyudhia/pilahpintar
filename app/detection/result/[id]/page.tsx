import ResultClient from "@/components/detection/ResultClient";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ResultClient id={id} />;
}
