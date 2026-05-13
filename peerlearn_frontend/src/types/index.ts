export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type Request_Data_Type = {
  id: string;
  req_maker_id: string;
  target_user_id: string;
  title: string;
  message: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  is_urgent: boolean;
  call_id: string | null;
  call_start_at: string | null;
  ai_rating: number | null;
  created_at: string;
  updated_at: string;
  req_maker?: {
    first_name: string;
    last_name: string;
    photo_url: string | null;
    academicInfo: {
      department: string;
    };
  },
  target_user?: {
    first_name: string;
    last_name: string;
    photo_url: string | null;
  };
};
export type Get_All_Request_Response_Type = {
  status: string;
  message: string;
  data: Request_Data_Type[];
};

export type Academic_Info_Type = {
  id: string;
  person_id: string;
  student_id: string;
  university: string;
  department:
  | "CSE"
  | "CIS"
  | "SWE"
  | "EEE"
  | "MCT"
  | "ESDM"
  | "PHRM"
  | "TEX";
  level:
  | "L1"
  | "L2"
  | "L3"
  | "L4";
  term:
  | "T1"
  | "T2"
  | "T3";
  created_at: string;
  updated_at: string;
};

export type Expertise_Type = {
  id: string;

  person_id: string;

  course_title:
  | "OS"
  | "DMML"
  | "MAD"
  | "AI"
  | "WEB_ENGINEERING";

  course_code: string;

  topic: string;

  level:
  | "EXPERT"
  | "BEGINNER";

  created_at: string;
  updated_at: string;
};

export enum Teaching_Category_Type {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  AVERAGE = "AVERAGE",
  POOR = "POOR",
}

export type Review_Type = {
  id: string;
  req_maker_id: string;
  target_user_id: string;
  request_id: string;
  ai_rating: number;
  human_rating: number;
  teaching_category: Teaching_Category_Type;
  details: string;
  course_title: string;
  course_code: string;
  topic: string;

  request: {
    target_user?: {
      first_name: string;
      last_name: string;
      photo_url: string | null;
      email: string;
      academicInfo?: Academic_Info_Type | null;
    },
    request_maker?: {
      first_name: string;
      last_name: string;
      photo_url: string | null;
      email: string;
      academicInfo?: Academic_Info_Type | null;
    }
  }
};

export type Get_All_Review_Response_Type = {
  status: string;
  message: string;
  data: Review_Type[];
};

export type Person_Data_Type = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  is_active: boolean;
  bkash: string | null;
  created_at: string;
  updated_at: string;
  academicInfo: Academic_Info_Type | null;
  expertises: Expertise_Type[];
  as_req_maker: Request_Data_Type[];
  target_user: {
    first_name: string;
    last_name: string;
    photo_url: string | null;
  };
  req_maker: {
    first_name: string;
    last_name: string;
    photo_url: string | null;
  };
  as_target_user: Request_Data_Type[];
  as_review_maker: Review_Type[];
  as_review_target_user: Review_Type[];
} | null;

export type Person_Data_Response_Type = {
  status: string;
  message: string;
  data: Person_Data_Type;
};
