interface ButtonsSection {
    text: string;
    link: string;
}

interface OfferSection {
    areaOffer: string;
    link: string;
}

export interface HeaderSection {
    title: string;
    buttonSection: ButtonsSection[];
    offerSection: OfferSection[];
}