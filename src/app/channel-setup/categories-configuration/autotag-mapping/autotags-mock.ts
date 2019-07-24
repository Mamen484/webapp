import { PagedResponse } from 'sfl-shared/entities';
import { Autotag } from '../../autotag';

export const autotagsMock = <PagedResponse<{ autotag: Autotag[] }>>{
    'total': 35,
    'limit': 200,
    'pages': 1,
    'page': 1,
    'count': 35,
    '_links': {
        'self': {'href': '/v1/feed/5446/autotag/category/745643956?limit=200\u0026page=1'},
        'first': {'href': '/v1/feed/5446/autotag/category/745643956?limit=200\u0026page=1'},
        'last': {'href': '/v1/feed/5446/autotag/category/745643956?limit=200\u0026page=1'}
    },
    '_embedded': {
        'autotag': [{
            'id': 152622,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152622,
            'value': '{CalificacinenergeticaCalor}',
            '_embedded': {
                'attribute': {
                    'id': 152622,
                    'taxonomyId': 7,
                    'name': 'Categor\u00eda',
                    'isRequired': true,
                    'constraintGroupId': null,
                    'defaultMapping': '{category_channel}'
                }
            }
        }, {
            'id': 152648,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152648,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152648,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Calibre',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152645,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152645,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152645,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Certificaci\u00f3n Ecol\u00f3gica',
                    'isRequired': false,
                    'constraintGroupId': 493,
                    'defaultMapping': null,
                }
            }
        }, {
            'id': 152654,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152654,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152654,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Contiene Semillas',
                    'isRequired': false,
                    'constraintGroupId': 494,
                    'defaultMapping': null,
                }
            }
        }, {
            'id': 152640,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152640,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152640,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Denominaci\u00f3n de Origen',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152655,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152655,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152655,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Direcci\u00f3n de la empresa',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152647,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152647,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152647,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Formato',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152653,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152653,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152653,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Informaci\u00f3n Nutricional',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152641,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152641,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152641,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Nombre de la Empresa',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152644,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152644,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152644,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Origen',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152651,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152651,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152651,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Peso',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152649,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152649,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152649,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Peso Neto',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152656,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152656,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152656,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Raz\u00f3n Social',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152650,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152650,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152650,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Tipo de Fruta',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152642,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152642,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152642,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Tipo de Hortaliza',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152646,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152646,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152646,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Tipo de Producto',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152652,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152652,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152652,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Tipo de Verdura',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152643,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152643,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152643,
                    'taxonomyId': 7,
                    'name': 'DATOS GENERALES Variedad',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152626,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152626,
            'value': '{CalificacinenergeticaCalor}',
            '_embedded': {
                'attribute': {
                    'id': 152626,
                    'taxonomyId': 7,
                    'name': 'Descripci\u00f3n abreviada por defecto',
                    'isRequired': true,
                    'constraintGroupId': null,
                    'defaultMapping': '{short_description}'
                }
            }
        }, {
            'id': 152636,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152636,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152636,
                    'taxonomyId': 7,
                    'name': 'Descripci\u00f3n general',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152627,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152627,
            'value': '{Cantidadviscolsticacm}',
            '_embedded': {
                'attribute': {
                    'id': 152627,
                    'taxonomyId': 7,
                    'name': 'Descripci\u00f3n larga por defecto',
                    'isRequired': true,
                    'constraintGroupId': null,
                    'defaultMapping': '{description}'
                }
            }
        }, {
            'id': 152637,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152637,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152637,
                    'taxonomyId': 7,
                    'name': 'Descripci\u00f3n Por defecto',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152625,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152625,
            'value': '{CalificacinenergeticaFrio}',
            '_embedded': {
                'attribute': {
                    'id': 152625,
                    'taxonomyId': 7,
                    'name': 'EAN',
                    'isRequired': true,
                    'constraintGroupId': null,
                    'defaultMapping': '{ean}'
                }
            }
        }, {
            'id': 152635,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152635,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152635,
                    'taxonomyId': 7,
                    'name': 'Fabricante',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152629,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152629,
            'value': '{CalificacinenergeticaFrio}',
            '_embedded': {
                'attribute': {
                    'id': 152629,
                    'taxonomyId': 7,
                    'name': 'Imagen de tipo Grande 1',
                    'isRequired': true,
                    'constraintGroupId': null,
                    'defaultMapping': '{image1}'
                }
            }
        }, {
            'id': 152630,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152630,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152630,
                    'taxonomyId': 7,
                    'name': 'Imagen de tipo Grande 2',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': '{image2}'
                }
            }
        }, {
            'id': 152631,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152631,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152631,
                    'taxonomyId': 7,
                    'name': 'Imagen de tipo Grande 3',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': '{image3}'
                }
            }
        }, {
            'id': 152632,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152632,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152632,
                    'taxonomyId': 7,
                    'name': 'Imagen de tipo Grande 4',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': '{image4}'
                }
            }
        }, {
            'id': 152633,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152633,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152633,
                    'taxonomyId': 7,
                    'name': 'Imagen de tipo Grande 5',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152634,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152634,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152634,
                    'taxonomyId': 7,
                    'name': 'Imagen de tipo Grande 6',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152628,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152628,
            'value': '{Cantidadviscolsticacm}',
            '_embedded': {
                'attribute': {
                    'id': 152628,
                    'taxonomyId': 7,
                    'name': 'Marca',
                    'isRequired': true,
                    'constraintGroupId': null,
                    'defaultMapping': '{brand}'
                }
            }
        }, {
            'id': 152623,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152623,
            'value': '{Cantidadviscolsticacm}',
            '_embedded': {
                'attribute': {
                    'id': 152623,
                    'taxonomyId': 7,
                    'name': 'Referencia de vendedor (SKU)',
                    'isRequired': true,
                    'constraintGroupId': null,
                    'defaultMapping': '{reference}'
                }
            }
        }, {
            'id': 152638,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152638,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152638,
                    'taxonomyId': 7,
                    'name': 'Texto legal',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }, {
            'id': 152624,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152624,
            'value': '{CalificacinenergeticaFrio}',
            '_embedded': {
                'attribute': {
                    'id': 152624,
                    'taxonomyId': 7,
                    'name': 'T\u00edtulo',
                    'isRequired': true,
                    'constraintGroupId': null,
                    'defaultMapping': '{name}'
                }
            }
        }, {
            'id': 152639,
            'feedId': 5446,
            'catalogCategoryId': 745643956,
            'channelAttributeId': 152639,
            'value': null,
            '_embedded': {
                'attribute': {
                    'id': 152639,
                    'taxonomyId': 7,
                    'name': 'URL Video',
                    'isRequired': false,
                    'constraintGroupId': null,
                    'defaultMapping': null
                }
            }
        }]
    }
};
