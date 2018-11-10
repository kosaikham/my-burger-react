import reducer from "./auth";
import * as acitonTypes from '../action/actionTypes';

describe("Auth_Reducer", () => {
  it("should return initial State", () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it('should return token and userId after AuthSuccess', () => {
      expect(reducer({
        idToken: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: "/"
      }, {
          type: acitonTypes.AUTH_SUCCESS,
          idToken: 'some-token',
        localId: 'some-user-id'
      })).toEqual({
        idToken: 'some-token',
        userId: 'some-user-id',
        error: null,
        loading: false,
        authRedirectPath: "/"
      })
  })
});
