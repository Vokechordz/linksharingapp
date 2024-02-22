import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const linksAdapter= createEntityAdapter({})

const initialState= linksAdapter.getInitialState()

export const linksApiSlice= apiSlice.injectEndpoints({
    endpoints: builder=> ({
        getLinks: builder.query({
            query: ()=> '/links',
            validateStatus: (response, result)=> {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedLinks=  responseData.map(link=> {
                    link.id= link._id
                    return link
                })
                return linksAdapter.setAll(initialState, loadedLinks)
            },
            providesTags: (result, error, arg)=> {
                if (result?.ids) {
                    return [
                        { type: 'Link', id: 'LIST' },
                        ...result.ids.map(id=> ({ type: 'Link', id }))
                    ]
                } else return [{ type: 'Link', id: 'LIST' }]
            }
        }),
        addNewLink: builder.mutation({
            query: initialLink => ({
                url: '/links',
                method: 'POST',
                body: {
                    ...initialLink,
                }
            }),
            invalidatesTags: [
                { type: 'Link', id: "LIST" }
            ]
        }), 
        updateLink: builder.mutation({
            query: initialLink => ({
                url: '/links',
                method: 'PATCH',
                body: {
                    ...initialLink,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Link', id: arg.id }
            ]
        }),
         deleteLink: builder.mutation({
            query: ({ id }) => ({
                url: `/links`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg)=> [
                { type: 'Link', id: arg.id }
            ]
         }),
    }),
})


export const {
    useGetLinksQuery,
    useAddNewLinkMutation,
    useUpdateLinkMutation,
    useDeleteLinkMutation
}= linksApiSlice


//retruns the query result object
export const selectLinksResult= linksApiSlice.endpoints.getLinks.select()

//creates memoized selector
const selectLinksData= createSelector(
    selectLinksResult,
    linksResult=> linksResult.data // normalized state object with ids and entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLinks,
    selectById: selectLinkById,
    selectIds: selectLinkIds
    //pass in a selector that returns the links slice of state
}= linksAdapter.getSelectors(state=> selectLinksData(state) ?? 
initialState)