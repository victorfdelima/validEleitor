type Role =
  | 'president'
  | 'governor'
  | 'senator'
  | 'congressman'
  | 'stateDeputy';

export function getUrl(type: Role, state: string) {
  function getUrlReplaced(baseUrl: string) {
    return baseUrl.replaceAll('{state}', state?.toLocaleLowerCase());
  }

  switch (type) {
    case 'president':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/{state}/{state}-c0001-e000544-r.json',
      );
    case 'governor':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/{state}/{state}-c0003-e000546-r.json',
      );
    case 'senator':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/{state}/{state}-c0005-e000546-r.json',
      );
    case 'congressman':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/{state}/{state}-c0006-e000546-r.json',
      );
    case 'stateDeputy':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/{state}/{state}-c0007-e000546-r.json',
      );
    default:
      return '';
  }
}

export function getImageUrl(type: Role, id: string, state: string) {
  function getUrlReplaced(baseUrl: string) {
    return baseUrl.replaceAll('{id}', id).replaceAll('{state}', state);
  }

  switch (type) {
    case 'president':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/544/fotos/br/{id}.jpeg',
      );
    case 'governor':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/546/fotos/{state}/{id}.jpeg',
      );
    case 'senator':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/546/fotos/{state}/{id}.jpeg',
      );
    case 'congressman':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/546/fotos/{state}/{id}.jpeg',
      );
    case 'stateDeputy':
      return getUrlReplaced(
        'https://resultados.tse.jus.br/oficial/ele2022/546/fotos/{state}/{id}.jpeg',
      );
    default:
      return '';
  }
}
