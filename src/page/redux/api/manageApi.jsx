import { baseApi } from "./baseApi";

const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBarberOwner: builder.query({
      query: ({ status, page, limit, searchTerm }) => {
        return {
          url: `/admin/saloons?status=${status}&searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllBarber: builder.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `/admin/barbers?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllReports: builder.query({
      query: () => {
        return {
          url: `/support/reports`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getCustomer: builder.query({
      query: ({ status, page, limit, searchTerm }) => {
        return {
          url: `/admin/customers?status=${status}&searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    blockOwner: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/admin/block-saloon/${id}`,
          method: "PATCH",
          body: { status: data },
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    blockCustomer: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/admin/block-customer/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    replyUser: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/support/replies/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getSingleReply: builder.query({
      query: ({ id }) => {
        return {
          url: `/support/reply-sent/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSubscription: builder.query({
      query: () => {
        return {
          url: `/subscription-plans`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addSubscription: builder.mutation({
      query: (data) => {
        return {
          url: "/subscription-plans",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateSubscription: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/subscription-plans/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    //     getSingleIterestUser: builder.query({
    //       query: ({ businessId }) => {
    //         return {
    //           url: `/business/get-single-business-with-users?businessId=${businessId}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getDetailsSingleIterestUser: builder.query({
    //       query: ({ businessId, interestedId }) => {
    //         return {
    //           url: `/business/interested-buyers-details?businessId=${businessId}&interestedId=${interestedId}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getAllBusiness: builder.query({
    //       query: () => {
    //         return {
    //           url: `/interested/interested-business`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getSingleFormat: builder.query({
    //       query: ({ formationId }) => {
    //         return {
    //           url: `/formation/single-format?formationId=${formationId}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getSingleBusinessContact: builder.query({
    //       query: ({ userId }) => {
    //         return {
    //           url: `/user/seller-detail?userId=${userId}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getAllHomeBusiness: builder.query({
    //       query: ({ businessRole }) => {
    //         return {
    //           url: `/business/filter-business-by-business-role?businessRole=${businessRole}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getAllFeturesBusiness: builder.query({
    //   query: ({ businessRole, country }) => {
    //     let url = `/business/featured-business?businessRole=${businessRole}`;
    //     if (country) {
    //       url += `&country=${country}`;
    //     }
    //     return {
    //       url,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    //     getAllBusinessHome: builder.query({
    //       query: () => {
    //         return {
    //           url: `/business/all-business`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //  getAllBusinessMostView: builder.query({
    //   query: ({ userId, role, country } = {}) => {
    //     let queryParams = [];

    //     if (userId) queryParams.push(`userId=${userId}`);
    //     if (role) queryParams.push(`role=${role}`);
    //     if (country) queryParams.push(`country=${country}`);

    //     const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    //     return {
    //       url: `/business/most-viewed${queryString}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    //     deleteBusiness: builder.mutation({
    //         query: (businessId) => {
    //             return {
    //                 url: `/business/delete-business?businessId=${businessId}`,
    //                 method: "DELETE",
    //             };
    //         },
    //          invalidatesTags: ['updateProfile']
    //     }),

    //     // getFaq: builder.query({
    //     //     query: () => {
    //     //         return {
    //     //             url: `/manage/get-faq`,
    //     //             method: "GET",
    //     //         };
    //     //     },
    //     //     providesTags: ["updateProfile"],
    //     // }),

    //     addInterest: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "interested/make-interested",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //     addBusinessValuation: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/business/business-valuation",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //     addBusiness: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/business/create-business",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //     addContact: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/home/help-and-support",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //     updateSingle: builder.mutation({
    //       query: ({ formData, businessId, user }) => {
    //         return {
    //           url: `/business/update-business?businessId=${businessId}&user=${user}`,
    //           method: "PATCH",
    //           body: formData,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //   getAllBusinesFilter: builder.query({
    //   query: ({
    //     category,
    //     location,
    //     country,
    //     ageOfListing,
    //     state,
    //     city,
    //     sortBy,
    //     businessType,
    //     ownerShipType,
    //     askingPrice,
    //     searchText,
    //     businessRole,
    //     subCategory
    //   }) => {
    //     let url = `/business/filter-business`;

    //     const params = [];
    //     if (category) params.push(`category=${encodeURIComponent(category)}`);
    //     if (subCategory) params.push(`subCategory=${encodeURIComponent(subCategory)}`);
    //     if (location) params.push(`location=${encodeURIComponent(location)}`);
    //     if (country) params.push(`country=${encodeURIComponent(country)}`);
    //      if (state) params.push(`country=${encodeURIComponent(state)}`);
    //       if (city) params.push(`country=${encodeURIComponent(city)}`);
    //     if (ageOfListing) params.push(`ageOfListing=${encodeURIComponent(ageOfListing)}`);
    //     if (sortBy) params.push(`sortBy=${encodeURIComponent(sortBy)}`);
    //     if (businessType) params.push(`businessType=${encodeURIComponent(businessType)}`);
    //     if (ownerShipType) params.push(`ownerShipType=${encodeURIComponent(ownerShipType)}`);
    //     if (askingPrice) params.push(`askingPrice=${encodeURIComponent(askingPrice)}`);
    //     if (searchText) params.push(`searchText=${encodeURIComponent(searchText)}`);
    //     if (businessRole) params.push(`businessRole=${encodeURIComponent(businessRole)}`);

    //     if (params.length > 0) {
    //       url += `?${params.join("&")}`;
    //     }

    //     return {
    //       url,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    //     getPlane: builder.query({
    //       query: ({ role }) => {
    //         return {
    //           url: `/subscription/get-subscription-plan?role=${role}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),
    //     postCheckout: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/payment/checkout",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //     singleGetCoupon: builder.query({
    //       query: ({ couponCode }) => ({
    //         url: `/coupon/get-single-coupon?couponCode=${couponCode}`,
    //         method: "GET",
    //       }),
    //       providesTags: ["updateProfile"],
    //     }),

    //     getCategtory: builder.query({
    //       query: () => {
    //         return {
    //           url: "/category/get-all-category",
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getTopCategtory: builder.query({
    //       query: () => {
    //         return {
    //           url: "/business/top-category",
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getAllFormate: builder.query({
    //       query: () => {
    //         return {
    //           url: "/formation/get-all-format",
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    // postInterestFormation: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/formation/make-user-interested",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),
  }),
});

export const {
  useGetBarberOwnerQuery,
  useGetSingleReplyQuery,
  useBlockOwnerMutation,
  useGetAllReportsQuery,
  useReplyUserMutation,
  useGetCustomerQuery,
  useGetAllBarberQuery,
  useBlockCustomerMutation,
  useAddSubscriptionMutation,
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation
} = businessApi;
