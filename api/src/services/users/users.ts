import { clerkClient } from '@clerk/express'
import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const updateUserRole: MutationResolvers['updateUserRole'] = async ({
  id,
  role,
  organizationId,
}) => {
  // Update Clerk user metadata
  await clerkClient.users.updateUser(id, {
    publicMetadata: {
      roles: role,
      organizationId,
    },
  })

  // Find and return existing user
  const user = await db.user.findUnique({
    where: { clerkId: id },
  })
  return user
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  organization: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).organization()
  },
  expenses: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).expenses()
  },
  trips: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).trips()
  },
  projects: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).projects()
  },
}
