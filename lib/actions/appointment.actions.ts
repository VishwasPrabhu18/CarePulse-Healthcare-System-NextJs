"use server";

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, storage } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

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

export const getRecentAppointmentsList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [
        Query.orderDesc("$createdAt"),
      ]
    );

    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduledCount += 1;
      } else if (appointment.status === "pending") {
        acc.pendingCount += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCount);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log("Error occurred while fetching recent appointments", error);
  }
}

export const updateAppointment = async ({appointmentId, userId, appointment, type}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Failed to update appointment");
    }

    // TODO: SMS Notification

    revalidatePath("/admin");
    
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log("Error occurred while updating an appointment", error);
  }
}