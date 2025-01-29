import mongoose, { Schema, Model } from 'mongoose';

interface Item {
  Menu_Title: string;
  Profile_Type: string;
  Primary_Color: string;
  Secondary_color: string;
  Background_Image: string;
  Item_Image: string;
  Section: string;
  Item_id: number;
  Name: string;
  Description: string;
  Price: string;
  profile: number;
}

interface PromotionItem {
    Menu_Title: string;
    Profile_Type: string;
    Primary_Color: string;
    Secondary_color: string;
    Background_Image: string;
    Item_Image: string;
    Section: string;
    Item_id: number;
    Name: string;
    Description: string;
    Price: string;
    profile: number;
}

interface Company {
  companyName: string;
  folderName: string;
  hojas: {
    Hoja1: Item[];
    Promotion: PromotionItem[];
  };
  status_Companies: boolean;
  visits: number;
  licence: any[];
  infoVisits: any[];
  loyaltyProgram: any[];
  delivery: any[];
  trafficStats: any[];
  marketingCampaigns: any[];
  giftCards: any[];
  latitude: string;
  longitude: string;
  createAt: Date;
  updateAt: Date;
}

const itemSchema = new Schema<Item>({
  Menu_Title: { type: String, required: true },
  Profile_Type: String,
  Primary_Color: String,
  Secondary_color: String,
  Background_Image: String,
  Item_Image: String,
  Section: String,
  Item_id: Number,
  Name: String,
  Description: String,
  Price: String,
  profile: Number,
});

const promotionItemSchema = new Schema<PromotionItem>({
    Menu_Title: { type: String, required: true },
    Profile_Type: String,
    Primary_Color: String,
    Secondary_color: String,
    Background_Image: String,
    Item_Image: String,
    Section: String,
    Item_id: Number,
    Name: String,
    Description: String,
    Price: String,
    profile: Number,
})

const companySchema = new Schema<Company>({
  companyName: { type: String, required: true },
  folderName: String,
  hojas: {
    Hoja1: [itemSchema],
    Promotion: [promotionItemSchema],
  },
  status_Companies: Boolean,
  visits: Number,
  licence: Array,
  infoVisits: Array,
  loyaltyProgram: Array,
  delivery: Array,
  trafficStats: Array,
  marketingCampaigns: Array,
  giftCards: Array,
  latitude: String,
  longitude: String,
  createAt: Date,
  updateAt: Date,
});

const CompanyModel = mongoose.models.Company || mongoose.model<Company>('Company', companySchema);

export default CompanyModel;