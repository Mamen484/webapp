interface CountryNameLocalized {
    fr: string;
    en: string;
    es: string;
    it: string;
    de: string;
    pt: string;
}
// if localization is missing - it equals to an English one
export const countries = <{code: string, name: CountryNameLocalized}[]>[
    {code: 'AT', name: {en: 'Austria', fr: 'Autriche', de: 'Osterreich'}},
    {code: 'AU', name: {en: 'Australia', fr: 'Australie', de: 'Australien'}},
    {code: 'BE', name: {en: 'Belgium', fr: 'Belgique', de: 'Belgien', it: 'Belgio', es: 'Belgica', pt: 'Belgica'}},
    {code: 'BG', name: {en: 'Bulgaria', fr: 'Bulgarie', de: 'Bulgarien'}},
    {code: 'BR', name: {en: 'Brazil', fr: 'Brésil', de: 'Brasilien', it: 'Brasile'}},
    {code: 'CA', name: {en: 'Canada', de: 'Kanada'}},
    {code: 'CZ', name: {en: 'Czech Republic', fr: 'République Tchèque', de: 'Tschechische Republik', it: 'Rep. Ceca',
            es: ' Republica Checa', pt: 'Checa, Republica'}},
    {code: 'CH', name: {en: 'Switzerland', fr: 'Suisse', de: 'Schweiz (Confoederatio Helvetica)', it: 'Svizzera',
            es: 'Suiza', pt: 'Suiça'}},
    {code: 'DE', name: {en: 'Germany', fr: 'Allemagne', de: 'Deutschland', it: 'Germania', es: 'Alemania', pt: 'Alemanha'}},
    {code: 'DK', name: {en: 'Denmark', fr: 'Danemark', de: 'Danemark', it: 'Danimarca', es: 'Dinamarca', pt: 'Dinamarca'}},
    {code: 'EE', name: {en: 'Estonia', fr: 'Estonie', de: 'Estland'}},
    {code: 'ES', name: {en: 'Spain', fr: 'Espagne', de: 'Spanien', it: 'Spagna', es: 'Espana', pt: 'Espanha'}},
    {code: 'FI', name: {en: 'Finland', fr: 'Finlande', de: 'Finnland', it: 'Finlandia', es: 'Finlandia', pt: 'Finlandia'}},
    {code: 'FR', name: {en: 'France', fr: 'France', de: 'Frankreich', it: 'Francia', es: 'Francia', pt: 'França'}},
    {code: 'GR', name: {en: 'Greece', fr: 'Grèce', de: 'Griechenland', it: 'Grecia', es: 'Grecia', pt: 'Grecia'}},
    {code: 'HR', name: {en: 'Croatia', fr: 'Croatie', de: 'Kroatien', it: 'Croazia', es: 'Croacia', pt: 'Croacia'}},
    {code: 'HU', name: {en: 'Hungary', fr: 'Hongrie', de: 'Ungarn', it: 'Ungheria', es: 'Hungria', pt: 'Hungria'}},
    {code: 'IE', name: {en: 'Ireland', fr: 'Irlande', de: 'Irland', it: 'Irlanda', es: 'Irlanda', pt: 'Irlanda'}},
    {code: 'IN', name: {en: 'India', fr: 'Inde', de: 'Indien'}},
    {code: 'IT', name: {en: 'Italy', fr: 'Italie', de: 'Italien', it: 'Italia', es: 'Italia', pt: 'Italia'}},
    {code: 'JP', name: {en: 'Japan', fr: 'Japon', it: 'Giappone', es: 'Japon', pt: 'Japao'}},
    {code: 'LT', name: {en: 'Lithuania', fr: 'Lituanie', de: 'Litauen', it: 'Lituania', es: 'Lituania', pt: 'Lituania'}},
    {code: 'LV', name: {en: 'Latvia', fr: 'Lettonie', de: 'Lettland', it: 'Lettonia', es: 'Letonia', pt: 'Letonia'}},
    {code: 'MX', name: {en: 'Mexico', fr: 'Mexique', de: 'Mexiko', it: 'Messico'}},
    {code: 'NL', name: {en: 'Netherlands', fr: 'Pays-Bas', de: 'Niederlande', it: 'Paesi Bassi', es: 'Paises Bajos',
            pt: 'Paises Baixos (Holanda)'}},
    {code: 'NO', name: {en: 'Norway', fr: 'Norvège', de: 'Norwegen', it: 'Norvegia', es: 'Noruega', pt: 'Noruega'}},
    {code: 'PL', name: {en: 'Poland', fr: 'Pologne', de: 'Polen', it: 'Polonia', es: 'Polonia', pt: 'Polonia'}},
    {code: 'PT', name: {en: 'Portugal', it: 'Portogallo'}},
    {code: 'RO', name: {en: 'Romania', fr: 'Roumanie', de: 'Rumanien', es: 'Rumania', pt: 'Romenia'}},
    {code: 'RU', name: {en: 'Russian Federation', fr: 'Fédération de Russe', de: 'Russische Foderation', it: 'Russia',
            es: 'Federacion Rusa', pt: 'Russia'}},
    {code: 'SE', name: {en: 'Sweden', fr: 'Suède', de: 'Schweden', it: 'Svezia', es: 'Suecia', pt: 'Suecia'}},
    {code: 'SI', name: {en: 'Slovenia', fr: 'Slovénie', de: 'Slowenien', es: 'Eslovenia', pt: 'Eslovenia'}},
    {code: 'SK', name: {en: 'Slovakia', fr: 'Slovaquie', de: 'Slowakei', it: 'Slovacchia', es: 'Eslovaquia', pt: 'Eslovaquia'}},
    {code: 'SL', name: {en: 'Sierra Leone', es: 'Sierra Leona', pt: 'Serra Leoa'}},
    {code: 'TH', name: {en: 'Thailand', fr: 'Thaïlande', it: 'Thailandia', es: 'Tailandia', pt: 'Tailandia'}},
    {code: 'TR', name: {en: 'Turkey', fr: 'Turquie', de: 'Turkei', it: 'Turchia', es: 'Turquia', pt: 'Turquia'}},
    {code: 'UK', name: {en: 'United Kingdom', fr: 'Royaume-Uni', de: 'Vereinigtes Konigreich Großbritannien und Nordirland',
            it: 'Regno Unito', es: 'Reino Unido', pt: 'Reino Unido da Gra-Bretanha e Irlanda do Norte'}},
    {code: 'US', name: {en: 'United States', fr: 'États Unis', de: 'Vereinigte Staaten von Amerika', it: 'Stati',
            es: 'Estados Unidos', pt: 'Estados Unidos'}},
];
