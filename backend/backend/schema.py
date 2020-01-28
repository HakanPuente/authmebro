import graphene

import graphql_jwt
import graphql_social_auth

import users.schema


class Query(users.schema.Query, graphene.ObjectType):
    pass


class Mutation(users.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    revoke_token = graphql_jwt.relay.Revoke.Field()
    social_auth = graphql_social_auth.SocialAuth.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
