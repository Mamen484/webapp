interface CountryNameLocalized {
    fr: string;
    en: string;
    es: string;
    it: string;
    de: string;
    pt: string;
}

export const countries = <{code: string, name: CountryNameLocalized}[]>[
    {code: 'AT', name: {en: 'Austria', fr: 'L\'Autriche'}},
    {code: 'AU', name: {en: 'Australia', fr: 'Australie'}},
    {code: 'BE', name: {en: 'Belgium', fr: 'Belgium'}},
    {code: 'BG', name: {en: 'Bulgaria', fr: 'Bulgarie'}},
    {code: 'BR', name: {en: 'Brazil', fr: 'Brésil'}},
    {code: 'CA', name: {en: 'Canada', fr: 'Canada'}},
    {code: 'CZ', name: {en: 'Czech Republic', fr: 'République Tchèque'}},
    {code: 'CH', name: {en: 'Switzerland', fr: 'Suisse'}},
    {code: 'DE', name: {en: 'Germany', fr: 'Allemagne'}},
    {code: 'DK', name: {en: 'Denmark', fr: 'Danemark'}},
    {code: 'EE', name: {en: 'Estonia', fr: 'Estonie'}},
    {code: 'ES', name: {en: 'Spain', fr: 'Espagne'}},
    {code: 'FI', name: {en: 'Finland', fr: 'Finlande'}},
    {code: 'FR', name: {en: 'France', fr: 'France'}},
    {code: 'GR', name: {en: 'Greece', fr: 'Grèce'}},
    {code: 'HR', name: {en: 'Croatia', fr: 'Croatie'}},
    {code: 'HU', name: {en: 'Hungary', fr: 'Hongrie'}},
    {code: 'IE', name: {en: 'Ireland', fr: 'Irlande'}},
    {code: 'IN', name: {en: 'India', fr: 'Inde'}},
    {code: 'IT', name: {en: 'Italy', fr: 'Italie'}},
    {code: 'JP', name: {en: 'Japan', fr: 'Japon'}},
    {code: 'LT', name: {en: 'Lithuania', fr: 'Lituanie'}},
    {code: 'LV', name: {en: 'Latvia', fr: 'Lettonie'}},
    {code: 'MX', name: {en: 'Mexico', fr: 'Mexique'}},
    {code: 'NL', name: {en: 'Netherlands', fr: 'Pays-Bas'}},
    {code: 'NO', name: {en: 'Norway', fr: 'Norvège'}},
    {code: 'PL', name: {en: 'Poland', fr: 'Pologne'}},
    {code: 'PT', name: {en: 'Portugal', fr: 'Portugal'}},
    {code: 'RO', name: {en: 'Romania', fr: 'Roumanie'}},
    {code: 'RU', name: {en: 'Russian Federation', fr: 'Fédération Russe'}},
    {code: 'SE', name: {en: 'Sweden', fr: 'Suède'}},
    {code: 'SI', name: {en: 'Slovenia', fr: 'Slovénie'}},
    {code: 'SK', name: {en: 'Slovakia', fr: 'Slovaquie'}},
    {code: 'SL', name: {en: 'Sierra Leone', fr: 'Sierra Leone'}},
    {code: 'TH', name: {en: 'Thailand', fr: 'Thaïlande'}},
    {code: 'TR', name: {en: 'Turkey', fr: 'Turquie'}},
    {code: 'UK', name: {en: 'United Kingdom', fr: 'Royaume-Uni'}},
    {code: 'US', name: {en: 'United States', fr: 'États Unis'}},
];
