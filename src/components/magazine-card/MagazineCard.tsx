import React, { useMemo } from "react";

import CommonCard from "@component/common-card/CommonCard";
import { imageKitURL } from "@utils/imageKitURL";
import slugify from "slugify";

export interface IMagazineEdtion {
  id: number;
  name: string;
  tags: string[];
  edition: { id: number; publicated_at: string; cover: string };
}

const MagazineCard: React.FC<IMagazineEdtion> = ({
  id,
  name,
  tags,
  edition,
}) => {
  const coverUrl = useMemo(() => imageKitURL(edition.cover), [edition.cover]);

  const thumbUrl = useMemo(
    () => imageKitURL(edition.cover, { width: "50", height: "50" }),
    [edition.cover]
  );

  const link = useMemo(() => {
    const url = slugify(`${id} ${name}`, {
      lower: true,
      locale: "pt",
    });
    return `/revistas/${url}/${edition.id}`;
  }, [id, name, edition.id]);

  return (
    <CommonCard
      isMagazine
      coverUrl={coverUrl}
      link={link}
      thumbCover={thumbUrl}
      tags={tags}
      premium
      publicatedAt={edition.publicated_at}
      publisherName={name}
    />
  );
};

export default MagazineCard;
