import { Card } from "@/components/ui/card";
import { formatTimestamp } from "@/services/Format";

export const TabOverview = ({ course }) => (
  <Card className="p-4 md:p-8 rounded-t-none border-t-0 shadow-none">
    {course.summary?.video_url && (
      <section className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold pb-4">Video Kilasan</h1>
        <iframe
          src={course.summary.video_url}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full aspect-video rounded-lg"
        ></iframe>
        <p className="text-sm text-muted-foreground mt-2">
          Durasi tonton: {course.summary.video_duration}
        </p>
      </section>
    )}

    <section className="mb-6">
      <h1 className="text-xl md:text-2xl font-semibold pb-4">Deskripsi</h1>
      <p className="leading-relaxed">{course.summary?.description}</p>
    </section>

    <section className="text-sm text-muted-foreground space-y-1">
      <p>Dibuat pada: {formatTimestamp(course.created_at)}</p>
      <p>Diupdate pada: {formatTimestamp(course.updated_at)}</p>
    </section>
  </Card>
);