// types/profile.ts
export interface IUser {
  _id: string;
  name: string;                     // Full name
  userName: string;                 // Username
  role: "USER" | "ADMIN" | "CREATOR"|"PROMOTER";
  email: string;
  phone?: string;                   // Phone number
  location?: string;                // Location
  country?: string;                 // Country
  image?: string;                    // Avatar image URL
  bio?: string;                     // Artist bio
  gender?: "male" | "female" | "other";
  birthday?: string;                // ISO date string
  contentTypes?: string[];          // Selected content types
  instagramUserName?: string;
  instagramFollowers?: number;
  tiktokUserName?: string;
  tiktokFollowers?: number;
  youtubeUserName?: string;
  youtubeFollowers?: number;
  totalFollowers?: number;          // Sum of all social followers
  totalSocialFollowers?: number;    // Alternative naming
  status: "active" | "inactive";
  verified: boolean;
  isDeleted: boolean;
  stripeCustomerId?: string;        // Optional Stripe ID
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface ProfileResponse {
  success: boolean;
  message: string;
  data: IUser;
}
