import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";

const SPACE = "alekvois/pilahpintar-detection";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { error: "Image tidak ditemukan" },
        { status: 400 },
      );
    }

    const client = await Client.connect(SPACE);

    const result = await client.predict("/predict", {
      image,
    });

    const [imageResult, json] = result.data as any;

    return NextResponse.json({
      imageUrl: imageResult?.url ?? "",
      detections: json?.data ?? [],
      status: json?.status ?? "error",
      message: json?.message ?? "",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Gagal melakukan deteksi",
      },
      {
        status: 500,
      },
    );
  }
}
