export function editionFormatter(edition) {
  return {
    ...edition,
    edition: {
      ...edition.edition,
      publicated_at: Intl.DateTimeFormat("pt-BR").format(
        new Date(edition.edition.publicated_at)
      ),
    },
  };
}
