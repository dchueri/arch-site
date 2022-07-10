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