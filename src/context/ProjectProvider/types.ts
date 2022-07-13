export interface IProjectEntity {
    id: string,
    clientName: string,
    description: string,
    idOfResponsible: string,
    dealDate: string,
    firstDeliveryDate: string,
    numberOfInstallments: number,
    price: number,
    commissionValue: number,
    status: boolean
}

export interface CreateProjectEntity {
    clientName: string,
    description: string,
    idOfResponsible: string,
    dealDate: string,
    numberOfInstallments: number,
    price: number
}

export interface EditProjectEntity {
    id: string,
    clientName: string,
    description: string,
    idOfResponsible: string,
    dealDate: string,
    numberOfInstallments: number,
    price: number
}