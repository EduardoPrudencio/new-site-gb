import React, { useMemo } from "react";

import CommonCard from "@component/common-card/CommonCard";
import { imageKitURL } from "@utils/imageKitURL";
import slugify from "slugify";

export interface INewspapersData {
  id: number;
  name: string;
  premium: boolean;
  tags: string[];
  edition: {
    id: number;
    publicated_at: string;
    images: {
      original: string;
      thumb: string;
    };
  };
}

interface ICardProps {
  card: INewspapersData;
}

const Newspapercard: React.FC<ICardProps> = ({
  card: { edition, id, name, premium, tags },
}) => {
  const coverUrl = useMemo(
    () => imageKitURL(edition.images.original),
    [edition.images.original]
  );

  const link = useMemo(() => {
    const slug = slugify(`${id} ${name}`, {
      lower: true,
      locale: "pt",
    });
    return `/jornais/${slug}/${edition.id}`;
  }, [id, name, edition.id]);

  return (
    <CommonCard
      coverUrl={coverUrl}
      link={link}
      thumbCover={edition.images.thumb}
      premium={premium}
      tags={tags}
      publicatedAt={edition.publicated_at}
      publisherName={name}
    />
  );
};

export default Newspapercard;
