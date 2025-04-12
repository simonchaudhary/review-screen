export type Content = {
  confidence: number;
  is_valid_format: boolean;
  orig_value: string | number;
  page: number;
  position: number[];
  position_label?: string[];
  review_required: boolean;
  validation_source: string;
  value: string | number;
};

export type Section = {
  acc: number;
  content: Content;
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract: number;
  id_auto_extract_label: string;
  ignore: boolean;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  org_id: string;
  p_title: string;
  p_type: string;
  parent_id: number;
  time_spent: number;
  type: string;
  user_id: string;
  drop_down_type?: string;
  children?: Section[][][];
};

export type SectionsData = {
  data: {
    rt_update_fields: string[];
    sections: {
      children: Section[];
      id: number;
      title: string;
      type: string;
    }[];
  };
  error: string;
  error_code: string;
  message: string;
  status: string;
  status_code: number;
};
