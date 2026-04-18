import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: {
      projectSlug: string;
      message: string;
      
    }) => {
      console.log("Sending data:", data);
      const res = await axios.post("/api/chat", data);
      return res.data;
    }
  });
}