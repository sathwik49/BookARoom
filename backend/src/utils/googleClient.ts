import { OAuth2Client } from "google-auth-library";
import appConfig from "../config/appConfig";

export const googleClient = new OAuth2Client(appConfig.GOOGLE_CLIENT_ID);
