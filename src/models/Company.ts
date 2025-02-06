import mongoose, { Schema, Document } from 'mongoose';

interface Item {
    Menu_Title: string;
    Background_Image: string;
    Item_Image: string;
    Section: string;
    Item_id: number;
    Name: string;
    Description: string;
    Price: string;
    profile: number;
}

interface PromotionItem extends Item {}

interface Hoja {
   fixed: any[];
}

export interface ICompany extends Document {
    companyName: string;
    folderName: string;
    hojas: Hoja;
    status_Companies: boolean;
    createAt: Date;
    updateAt: Date;
}

const CompanySchema: Schema = new Schema({
    companyName: { type: String, required: true, unique: true },
    folderName: { type: String, required: true },
    hojas: {
        Hoja1: [{ type: Object, required: true }],
        Promotion: [{ type: Object, required: true }],
    },
    status_Companies: { type: Boolean, default: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

export default mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);
