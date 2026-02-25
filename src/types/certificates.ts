


// certificate type enum

export enum CertificateType {
    Course = "Course",
    Specialization = "Specialization",
    Professional = "Professional",
    Program = "Program",
}


export type Certificate = {
    id: string;
    name: string;
    issuer: string;
    issuer_icon: string;
    date: string;
    type: CertificateType;
    tags: string;
    url?: string;
};
