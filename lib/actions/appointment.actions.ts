"use server";

import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, storage } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (appointmentData: CreateAppointmentParams) => {
  try {

    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log("Error occurred while creating an appointment", error);
  }
}

export const getAppointments = async (appointmentId: string) => { 
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    
    return parseStringify(appointment);
  } catch (error) {
    console.log("Error occurred while fetching appointments", error);
  }
};