// @ts-nocheck
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DataType: any;
  Date: any;
  FileType: any;
  FileUpload: any;
};

export type Alert = {
  __typename?: 'Alert';
  background?: Maybe<Style>;
  borders?: Maybe<Style>;
  height?: Maybe<Style>;
  id: Scalars['ID'];
  name: Scalars['String'];
  position: Scalars['String'];
  running?: Maybe<Scalars['Boolean']>;
  textColor?: Maybe<Style>;
  textPosition?: Maybe<Style>;
  textSize?: Maybe<Style>;
  type: Scalars['String'];
  validity?: Maybe<Validity>;
  value: Scalars['String'];
};

export type AlertData = {
  __typename?: 'AlertData';
  background?: Maybe<Scalars['String']>;
  borders?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  position: Scalars['String'];
  running?: Maybe<Scalars['Boolean']>;
  textColor?: Maybe<Scalars['String']>;
  textPosition?: Maybe<Scalars['String']>;
  textSize?: Maybe<Scalars['String']>;
  validity?: Maybe<Validity>;
  value: Scalars['String'];
};

export type Asset = {
  __typename?: 'Asset';
  alert?: Maybe<Alert>;
  animationIn?: Maybe<Style>;
  animationOut?: Maybe<Style>;
  assetLists?: Maybe<Array<Maybe<AssetList>>>;
  directory?: Maybe<Directory>;
  id: Scalars['ID'];
  name: Scalars['String'];
  path: Scalars['String'];
  showTime?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  type: Scalars['FileType'];
  validity?: Maybe<Validity>;
};

export type AssetAssignInput = {
  animationIn?: InputMaybe<Scalars['String']>;
  animationOut?: InputMaybe<Scalars['String']>;
  asset: Scalars['String'];
  position?: InputMaybe<Scalars['Int']>;
  showTime?: InputMaybe<Scalars['Int']>;
  validFrom?: InputMaybe<Scalars['Date']>;
  validTo?: InputMaybe<Scalars['Date']>;
  validityEnabled: Scalars['Boolean'];
};

export type AssetData = {
  __typename?: 'AssetData';
  alert?: Maybe<AlertData>;
  animationIn?: Maybe<Scalars['String']>;
  animationOut?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  path: Scalars['String'];
  showTime?: Maybe<Scalars['Int']>;
  type: Scalars['FileType'];
  validity?: Maybe<Validity>;
};

export type AssetEntry = {
  __typename?: 'AssetEntry';
  animationIn?: Maybe<Style>;
  animationOut?: Maybe<Style>;
  asset: Asset;
  id: Scalars['ID'];
  position?: Maybe<Scalars['Int']>;
  showTime?: Maybe<Scalars['Int']>;
  validity: Validity;
};

export type AssetList = {
  __typename?: 'AssetList';
  animationIn?: Maybe<Style>;
  animationOut?: Maybe<Style>;
  assets?: Maybe<Array<Maybe<AssetEntry>>>;
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  prioritized?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  validity?: Maybe<Validity>;
};

export type CreateAlertInput = {
  background?: InputMaybe<Scalars['String']>;
  borders?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  position: Scalars['String'];
  running?: InputMaybe<Scalars['Boolean']>;
  textColor?: InputMaybe<Scalars['String']>;
  textPosition?: InputMaybe<Scalars['String']>;
  textSize?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  validFrom?: InputMaybe<Scalars['Date']>;
  validTo?: InputMaybe<Scalars['Date']>;
  validityEnabled?: InputMaybe<Scalars['Boolean']>;
  value: Scalars['String'];
};

export type CreateAssetInput = {
  alert?: InputMaybe<Scalars['String']>;
  animationIn?: InputMaybe<Scalars['String']>;
  animationOut?: InputMaybe<Scalars['String']>;
  directory?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  showTime?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<ListChange>;
  validFrom?: InputMaybe<Scalars['Date']>;
  validTo?: InputMaybe<Scalars['Date']>;
  validityEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type CreateAssetListInput = {
  animationIn?: InputMaybe<Scalars['String']>;
  animationOut?: InputMaybe<Scalars['String']>;
  enabled: Scalars['Boolean'];
  name: Scalars['String'];
  prioritized?: InputMaybe<Scalars['Boolean']>;
  type: Scalars['String'];
  validFrom?: InputMaybe<Scalars['Date']>;
  validTo?: InputMaybe<Scalars['Date']>;
  validityEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type CreateDirectoryInput = {
  name: Scalars['String'];
  parentDirectory?: InputMaybe<Scalars['String']>;
};

export type CreateGroupInput = {
  alert?: InputMaybe<Scalars['String']>;
  assetLists?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name: Scalars['String'];
};

export type CreatePlayerInput = {
  group?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  token: Scalars['String'];
};

export type CreateStyleInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
  valueType: Scalars['String'];
};

export type CreateTagInput = {
  color?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateUserInput = {
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type DeployData = {
  __typename?: 'DeployData';
  id: Scalars['String'];
  versionHash: Scalars['String'];
};

export type Directory = {
  __typename?: 'Directory';
  id: Scalars['ID'];
  name: Scalars['String'];
  parentDirectory?: Maybe<Directory>;
};

export type FindAlertInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type FindAssetInput = {
  directory?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['FileType']>;
};

export type FindAssetListInput = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  prioritized?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

export type FindDirectoryInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parentDirectory?: InputMaybe<Scalars['String']>;
};

export type FindGroupInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FindPlayerInput = {
  group?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type FindSettingsGroupInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['String']>;
};

export type FindSettingsValueInput = {
  id?: InputMaybe<Scalars['ID']>;
  settings?: InputMaybe<Scalars['String']>;
};

export type FindStyleInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  valueType?: InputMaybe<Scalars['String']>;
};

export type FindTagInput = {
  color?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FindUserInput = {
  id?: InputMaybe<Scalars['ID']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Group = {
  __typename?: 'Group';
  alert?: Maybe<Alert>;
  assetLists?: Maybe<Array<Maybe<AssetList>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ListChange = {
  content: Array<InputMaybe<Scalars['String']>>;
  mergeStrategy: Scalars['String'];
};

export type LoginDetails = {
  __typename?: 'LoginDetails';
  token: Token;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignAssetToAssetList: AssetList;
  createAlert: Alert;
  createAsset: Asset;
  createAssetList: AssetList;
  createDirectory: Directory;
  createGroup: Group;
  createPlayer: Player;
  createStyle: Style;
  createTag: Tag;
  createUser: User;
  deleteAlert: Alert;
  deleteAsset: Asset;
  deleteAssetList: AssetList;
  deleteDirectory: Directory;
  deleteGroup: Group;
  deletePlayer: Player;
  deleteStyle: Style;
  deleteTag: Tag;
  deleteUser: User;
  deploy?: Maybe<DeployData>;
  login?: Maybe<LoginDetails>;
  removeAssetFromAssetList: AssetList;
  setSettingsValue?: Maybe<SettingsValue>;
  totalDeleteAlert: Scalars['Boolean'];
  totalDeleteAsset: Scalars['Boolean'];
  totalDeleteAssetList: Scalars['Boolean'];
  totalDeleteDirectory: Scalars['Boolean'];
  totalDeleteGroup: Scalars['Boolean'];
  totalDeletePlayer: Scalars['Boolean'];
  totalDeleteStyle: Scalars['Boolean'];
  totalDeleteTag: Scalars['Boolean'];
  totalDeleteUser: Scalars['Boolean'];
  updateAlert: Alert;
  updateAsset: Asset;
  updateAssetList: AssetList;
  updateDirectory: Directory;
  updateGroup: Group;
  updatePlayer: Player;
  updateStyle: Style;
  updateTag: Tag;
  updateUser: User;
};


export type MutationAssignAssetToAssetListArgs = {
  data: AssetAssignInput;
  id: Scalars['ID'];
};


export type MutationCreateAlertArgs = {
  data: CreateAlertInput;
};


export type MutationCreateAssetArgs = {
  data: CreateAssetInput;
  file: Scalars['FileUpload'];
};


export type MutationCreateAssetListArgs = {
  data: CreateAssetListInput;
};


export type MutationCreateDirectoryArgs = {
  data: CreateDirectoryInput;
};


export type MutationCreateGroupArgs = {
  data: CreateGroupInput;
};


export type MutationCreatePlayerArgs = {
  data: CreatePlayerInput;
};


export type MutationCreateStyleArgs = {
  data: CreateStyleInput;
};


export type MutationCreateTagArgs = {
  data: CreateTagInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteAlertArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteAssetArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteAssetListArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDirectoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteStyleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  shortSession: Scalars['Boolean'];
  username: Scalars['String'];
};


export type MutationRemoveAssetFromAssetListArgs = {
  assetEntry: Scalars['ID'];
  id: Scalars['ID'];
};


export type MutationSetSettingsValueArgs = {
  data?: InputMaybe<SetSettingsValueInput>;
  settings: Scalars['String'];
};


export type MutationTotalDeleteAlertArgs = {
  id: Scalars['ID'];
};


export type MutationTotalDeleteAssetArgs = {
  id: Scalars['ID'];
};


export type MutationTotalDeleteAssetListArgs = {
  id: Scalars['ID'];
};


export type MutationTotalDeleteDirectoryArgs = {
  id: Scalars['ID'];
};


export type MutationTotalDeleteGroupArgs = {
  id: Scalars['ID'];
};


export type MutationTotalDeletePlayerArgs = {
  id: Scalars['ID'];
};


export type MutationTotalDeleteStyleArgs = {
  id: Scalars['ID'];
};


export type MutationTotalDeleteTagArgs = {
  id: Scalars['ID'];
};


export type MutationTotalDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateAlertArgs = {
  data: UpdateAlertInput;
  id: Scalars['ID'];
};


export type MutationUpdateAssetArgs = {
  data: UpdateAssetInput;
  file?: InputMaybe<Scalars['FileUpload']>;
  id: Scalars['ID'];
};


export type MutationUpdateAssetListArgs = {
  data: UpdateAssetListInput;
  id: Scalars['ID'];
};


export type MutationUpdateDirectoryArgs = {
  data: UpdateDirectoryInput;
  id: Scalars['ID'];
};


export type MutationUpdateGroupArgs = {
  data: UpdateGroupInput;
  id: Scalars['ID'];
};


export type MutationUpdatePlayerArgs = {
  data: UpdatePlayerInput;
  id: Scalars['ID'];
};


export type MutationUpdateStyleArgs = {
  data: UpdateStyleInput;
  id: Scalars['ID'];
};


export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['ID'];
};

export type Player = {
  __typename?: 'Player';
  group?: Maybe<Group>;
  id: Scalars['ID'];
  name: Scalars['String'];
  token: Scalars['String'];
};

export type PlayerData = {
  __typename?: 'PlayerData';
  alert?: Maybe<AlertData>;
  assets: Array<Maybe<AssetData>>;
  priorityAssets: Array<Maybe<AssetData>>;
  styles: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  deployInfo?: Maybe<DeployData>;
  findAlert: Alert;
  findAllAlerts: Array<Maybe<Alert>>;
  findAllAssetLists: Array<Maybe<AssetList>>;
  findAllAssets: Array<Maybe<Asset>>;
  findAllDirectories: Array<Maybe<Directory>>;
  findAllGroups: Array<Maybe<Group>>;
  findAllPlayers: Array<Maybe<Player>>;
  findAllSettingsGroups: Array<Maybe<SettingsGroup>>;
  findAllSettingsValues: Array<Maybe<SettingsValue>>;
  findAllStyles: Array<Maybe<Style>>;
  findAllTags: Array<Maybe<Tag>>;
  findAllUsers: Array<Maybe<User>>;
  findAsset: Asset;
  findAssetList: AssetList;
  findDirectory: Directory;
  findGroup: Group;
  findPlayer: Player;
  findStyle: Style;
  findTag: Tag;
  findUser: User;
  syncPlayer?: Maybe<PlayerData>;
};


export type QueryFindAlertArgs = {
  data: FindAlertInput;
};


export type QueryFindAllAlertsArgs = {
  data: FindAlertInput;
};


export type QueryFindAllAssetListsArgs = {
  data: FindAssetListInput;
};


export type QueryFindAllAssetsArgs = {
  data: FindAssetInput;
};


export type QueryFindAllDirectoriesArgs = {
  data: FindDirectoryInput;
};


export type QueryFindAllGroupsArgs = {
  data: FindGroupInput;
};


export type QueryFindAllPlayersArgs = {
  data: FindPlayerInput;
};


export type QueryFindAllSettingsGroupsArgs = {
  data?: InputMaybe<FindSettingsGroupInput>;
};


export type QueryFindAllSettingsValuesArgs = {
  data?: InputMaybe<FindSettingsValueInput>;
};


export type QueryFindAllStylesArgs = {
  data: FindStyleInput;
};


export type QueryFindAllTagsArgs = {
  data: FindTagInput;
};


export type QueryFindAllUsersArgs = {
  data: FindUserInput;
};


export type QueryFindAssetArgs = {
  data: FindAssetInput;
};


export type QueryFindAssetListArgs = {
  data: FindAssetListInput;
};


export type QueryFindDirectoryArgs = {
  data: FindDirectoryInput;
};


export type QueryFindGroupArgs = {
  data: FindGroupInput;
};


export type QueryFindPlayerArgs = {
  data: FindPlayerInput;
};


export type QueryFindStyleArgs = {
  data: FindStyleInput;
};


export type QueryFindTagArgs = {
  data: FindTagInput;
};


export type QueryFindUserArgs = {
  data: FindUserInput;
};


export type QuerySyncPlayerArgs = {
  token: Scalars['String'];
};

export type SetSettingsValueInput = {
  value: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['DataType'];
};

export type SettingsGroup = {
  __typename?: 'SettingsGroup';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<SettingsGroup>;
  settings?: Maybe<Array<Maybe<Settings>>>;
};

export type SettingsValue = {
  __typename?: 'SettingsValue';
  data: Scalars['String'];
  id: Scalars['ID'];
  settings: Scalars['String'];
  type: Scalars['DataType'];
};

export type Style = {
  __typename?: 'Style';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
  valueType: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  deployInfoSync?: Maybe<DeployData>;
};

export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  accessToken?: Maybe<Scalars['String']>;
  expiresIn?: Maybe<Scalars['Date']>;
};

export type UpdateAlertInput = {
  background?: InputMaybe<Scalars['String']>;
  borders?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  running?: InputMaybe<Scalars['Boolean']>;
  textColor?: InputMaybe<Scalars['String']>;
  textPosition?: InputMaybe<Scalars['String']>;
  textSize?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  validFrom?: InputMaybe<Scalars['Date']>;
  validTo?: InputMaybe<Scalars['Date']>;
  validityEnabled?: InputMaybe<Scalars['Boolean']>;
  value?: InputMaybe<Scalars['String']>;
};

export type UpdateAssetInput = {
  alert?: InputMaybe<Scalars['String']>;
  animationIn?: InputMaybe<Scalars['String']>;
  animationOut?: InputMaybe<Scalars['String']>;
  directory?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  showTime?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<ListChange>;
  validFrom?: InputMaybe<Scalars['Date']>;
  validTo?: InputMaybe<Scalars['Date']>;
  validityEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateAssetListInput = {
  animationIn?: InputMaybe<Scalars['String']>;
  animationOut?: InputMaybe<Scalars['String']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  prioritized?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
  validFrom?: InputMaybe<Scalars['Date']>;
  validTo?: InputMaybe<Scalars['Date']>;
  validityEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateDirectoryInput = {
  name: Scalars['String'];
  parentDirectory?: InputMaybe<Scalars['String']>;
};

export type UpdateGroupInput = {
  alert?: InputMaybe<Scalars['String']>;
  assetLists?: InputMaybe<ListChange>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdatePlayerInput = {
  group?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type UpdateStyleInput = {
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  valueType?: InputMaybe<Scalars['String']>;
};

export type UpdateTagInput = {
  color?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UpdateUserInput = {
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  role?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Validity = {
  __typename?: 'Validity';
  enabled: Scalars['Boolean'];
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
};

export type FindAllAlertsQueryVariables = Exact<{
  data: FindAlertInput;
}>;


export type FindAllAlertsQuery = { __typename?: 'Query', findAllAlerts: Array<{ __typename?: 'Alert', id: string, name: string, type: string, position: string } | null | undefined> };

export type CreateAlertMutationVariables = Exact<{
  data: CreateAlertInput;
}>;


export type CreateAlertMutation = { __typename?: 'Mutation', createAlert: { __typename?: 'Alert', id: string } };

export type DeleteAlertMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAlertMutation = { __typename?: 'Mutation', deleteAlert: { __typename?: 'Alert', id: string } };

export type FindAlertQueryVariables = Exact<{
  data: FindAlertInput;
}>;


export type FindAlertQuery = { __typename?: 'Query', findAlert: { __typename?: 'Alert', id: string, name: string, type: string, position: string, value: string, running?: boolean | null | undefined, validity?: { __typename?: 'Validity', enabled: boolean, from?: any | null | undefined, to?: any | null | undefined } | null | undefined, background?: { __typename?: 'Style', id: string, name: string, type: string, value: string, valueType: string } | null | undefined, borders?: { __typename?: 'Style', id: string, name: string, type: string, value: string, valueType: string } | null | undefined, height?: { __typename?: 'Style', id: string, name: string, type: string, value: string, valueType: string } | null | undefined, textSize?: { __typename?: 'Style', id: string, name: string, type: string, value: string, valueType: string } | null | undefined, textColor?: { __typename?: 'Style', id: string, name: string, type: string, value: string, valueType: string } | null | undefined, textPosition?: { __typename?: 'Style', id: string, name: string, type: string, value: string, valueType: string } | null | undefined } };

export type UpdateAlertMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateAlertInput;
}>;


export type UpdateAlertMutation = { __typename?: 'Mutation', updateAlert: { __typename?: 'Alert', id: string } };

export type FindAllAssetsQueryVariables = Exact<{
  data: FindAssetInput;
}>;


export type FindAllAssetsQuery = { __typename?: 'Query', findAllAssets: Array<{ __typename?: 'Asset', id: string, name: string, type: any, path: string, showTime?: number | null | undefined } | null | undefined> };

export type CreateAssetMutationVariables = Exact<{
  data: CreateAssetInput;
  file: Scalars['FileUpload'];
}>;


export type CreateAssetMutation = { __typename?: 'Mutation', createAsset: { __typename?: 'Asset', id: string } };

export type DeleteAssetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAssetMutation = { __typename?: 'Mutation', deleteAsset: { __typename?: 'Asset', id: string } };

export type FindAssetQueryVariables = Exact<{
  data: FindAssetInput;
}>;


export type FindAssetQuery = { __typename?: 'Query', findAsset: { __typename?: 'Asset', id: string, name: string, path: string, type: any, showTime?: number | null | undefined, directory?: { __typename?: 'Directory', id: string, name: string } | null | undefined, tags?: Array<{ __typename?: 'Tag', id: string, name: string, color?: string | null | undefined } | null | undefined> | null | undefined, alert?: { __typename?: 'Alert', id: string, name: string } | null | undefined, animationIn?: { __typename?: 'Style', id: string, name: string } | null | undefined, animationOut?: { __typename?: 'Style', id: string, name: string } | null | undefined, validity?: { __typename?: 'Validity', enabled: boolean, from?: any | null | undefined, to?: any | null | undefined } | null | undefined, assetLists?: Array<{ __typename?: 'AssetList', id: string, name: string, type: string, assets?: Array<{ __typename?: 'AssetEntry', id: string, asset: { __typename?: 'Asset', id: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } };

export type UpdateAssetMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateAssetInput;
  file?: InputMaybe<Scalars['FileUpload']>;
}>;


export type UpdateAssetMutation = { __typename?: 'Mutation', updateAsset: { __typename?: 'Asset', id: string } };

export type FindAllAssetListsQueryVariables = Exact<{
  data: FindAssetListInput;
}>;


export type FindAllAssetListsQuery = { __typename?: 'Query', findAllAssetLists: Array<{ __typename?: 'AssetList', id: string, name: string } | null | undefined> };

export type AssignAssetToAssetListMutationVariables = Exact<{
  id: Scalars['ID'];
  data: AssetAssignInput;
}>;


export type AssignAssetToAssetListMutation = { __typename?: 'Mutation', assignAssetToAssetList: { __typename?: 'AssetList', id: string } };

export type RemoveAssetFromAssetListMutationVariables = Exact<{
  id: Scalars['ID'];
  asset: Scalars['ID'];
}>;


export type RemoveAssetFromAssetListMutation = { __typename?: 'Mutation', removeAssetFromAssetList: { __typename?: 'AssetList', id: string } };

export type CreateAssetListMutationVariables = Exact<{
  data: CreateAssetListInput;
}>;


export type CreateAssetListMutation = { __typename?: 'Mutation', createAssetList: { __typename?: 'AssetList', id: string } };

export type DeleteAssetListMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAssetListMutation = { __typename?: 'Mutation', deleteAssetList: { __typename?: 'AssetList', id: string } };

export type FindAssetListQueryVariables = Exact<{
  data: FindAssetListInput;
}>;


export type FindAssetListQuery = { __typename?: 'Query', findAssetList: { __typename?: 'AssetList', id: string, name: string, type: string, prioritized?: boolean | null | undefined, enabled: boolean, validity?: { __typename?: 'Validity', enabled: boolean, from?: any | null | undefined, to?: any | null | undefined } | null | undefined, assets?: Array<{ __typename?: 'AssetEntry', id: string, showTime?: number | null | undefined, asset: { __typename?: 'Asset', id: string, name: string, path: string }, validity: { __typename?: 'Validity', enabled: boolean, from?: any | null | undefined, to?: any | null | undefined }, animationIn?: { __typename?: 'Style', id: string, name: string } | null | undefined } | null | undefined> | null | undefined } };

export type UpdateAssetListMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateAssetListInput;
}>;


export type UpdateAssetListMutation = { __typename?: 'Mutation', updateAssetList: { __typename?: 'AssetList', id: string } };

export type DeployMutationVariables = Exact<{ [key: string]: never; }>;


export type DeployMutation = { __typename?: 'Mutation', deploy?: { __typename?: 'DeployData', versionHash: string } | null | undefined };

export type FindAllDirectoriesQueryVariables = Exact<{
  data: FindDirectoryInput;
}>;


export type FindAllDirectoriesQuery = { __typename?: 'Query', findAllDirectories: Array<{ __typename?: 'Directory', id: string, name: string, parentDirectory?: { __typename?: 'Directory', id: string } | null | undefined } | null | undefined> };

export type CreateDirectoryMutationVariables = Exact<{
  data: CreateDirectoryInput;
}>;


export type CreateDirectoryMutation = { __typename?: 'Mutation', createDirectory: { __typename?: 'Directory', id: string, name: string } };

export type DeleteDirectoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteDirectoryMutation = { __typename?: 'Mutation', deleteDirectory: { __typename?: 'Directory', id: string } };

export type FindDirectoryQueryVariables = Exact<{
  data: FindDirectoryInput;
}>;


export type FindDirectoryQuery = { __typename?: 'Query', findDirectory: { __typename?: 'Directory', id: string, name: string } };

export type UpdateDirectoryMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateDirectoryInput;
}>;


export type UpdateDirectoryMutation = { __typename?: 'Mutation', updateDirectory: { __typename?: 'Directory', id: string } };

export type FindAllGroupsQueryVariables = Exact<{
  data: FindGroupInput;
}>;


export type FindAllGroupsQuery = { __typename?: 'Query', findAllGroups: Array<{ __typename?: 'Group', id: string, name: string } | null | undefined> };

export type CreateGroupMutationVariables = Exact<{
  data: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string } };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string } };

export type FindGroupQueryVariables = Exact<{
  data: FindGroupInput;
}>;


export type FindGroupQuery = { __typename?: 'Query', findGroup: { __typename?: 'Group', id: string, name: string, assetLists?: Array<{ __typename?: 'AssetList', id: string, name: string } | null | undefined> | null | undefined, alert?: { __typename?: 'Alert', id: string, name: string } | null | undefined } };

export type UpdateGroupMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateGroupInput;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  shortSession: Scalars['Boolean'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginDetails', user: { __typename?: 'User', id: string, username: string, role?: string | null | undefined }, token: { __typename?: 'Token', accessToken?: string | null | undefined, expiresIn?: any | null | undefined } } | null | undefined };

export type FindAllPlayersQueryVariables = Exact<{
  data: FindPlayerInput;
}>;


export type FindAllPlayersQuery = { __typename?: 'Query', findAllPlayers: Array<{ __typename?: 'Player', id: string, name: string, token: string } | null | undefined> };

export type CreatePlayerMutationVariables = Exact<{
  data: CreatePlayerInput;
}>;


export type CreatePlayerMutation = { __typename?: 'Mutation', createPlayer: { __typename?: 'Player', id: string } };

export type DeletePlayerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePlayerMutation = { __typename?: 'Mutation', deletePlayer: { __typename?: 'Player', id: string } };

export type FindPlayerQueryVariables = Exact<{
  data: FindPlayerInput;
}>;


export type FindPlayerQuery = { __typename?: 'Query', findPlayer: { __typename?: 'Player', id: string, name: string, token: string, group?: { __typename?: 'Group', id: string, name: string } | null | undefined } };

export type UpdatePlayerMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdatePlayerInput;
}>;


export type UpdatePlayerMutation = { __typename?: 'Mutation', updatePlayer: { __typename?: 'Player', id: string } };

export type FindAllStylesQueryVariables = Exact<{
  data: FindStyleInput;
}>;


export type FindAllStylesQuery = { __typename?: 'Query', findAllStyles: Array<{ __typename?: 'Style', id: string, name: string, type: string, value: string, valueType: string } | null | undefined> };

export type CreateStyleMutationVariables = Exact<{
  data: CreateStyleInput;
}>;


export type CreateStyleMutation = { __typename?: 'Mutation', createStyle: { __typename?: 'Style', id: string } };

export type DeleteStyleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteStyleMutation = { __typename?: 'Mutation', deleteStyle: { __typename?: 'Style', id: string } };

export type FindStyleQueryVariables = Exact<{
  data: FindStyleInput;
}>;


export type FindStyleQuery = { __typename?: 'Query', findStyle: { __typename?: 'Style', id: string, name: string, type: string, value: string, valueType: string } };

export type UpdateStyleMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateStyleInput;
}>;


export type UpdateStyleMutation = { __typename?: 'Mutation', updateStyle: { __typename?: 'Style', id: string } };

export type FindAllTagsQueryVariables = Exact<{
  data: FindTagInput;
}>;


export type FindAllTagsQuery = { __typename?: 'Query', findAllTags: Array<{ __typename?: 'Tag', id: string, name: string, color?: string | null | undefined } | null | undefined> };

export type CreateTagMutationVariables = Exact<{
  data: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: string } };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: { __typename?: 'Tag', id: string } };

export type FindTagQueryVariables = Exact<{
  data: FindTagInput;
}>;


export type FindTagQuery = { __typename?: 'Query', findTag: { __typename?: 'Tag', id: string, name: string, color?: string | null | undefined } };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateTagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', id: string } };

export type FindAllUsersQueryVariables = Exact<{
  data: FindUserInput;
}>;


export type FindAllUsersQuery = { __typename?: 'Query', findAllUsers: Array<{ __typename?: 'User', id: string, username: string, role?: string | null | undefined } | null | undefined> };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string } };

export type FindUserQueryVariables = Exact<{
  data: FindUserInput;
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: { __typename?: 'User', id: string, username: string, role?: string | null | undefined } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export const FindAllAlertsDocument = gql`
    query FindAllAlerts($data: FindAlertInput!) {
  findAllAlerts(data: $data) {
    id
    name
    type
    position
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllAlertsGQL extends Apollo.Query<FindAllAlertsQuery, FindAllAlertsQueryVariables> {
    document = FindAllAlertsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAlertDocument = gql`
    mutation CreateAlert($data: CreateAlertInput!) {
  createAlert(data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAlertGQL extends Apollo.Mutation<CreateAlertMutation, CreateAlertMutationVariables> {
    document = CreateAlertDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteAlertDocument = gql`
    mutation DeleteAlert($id: ID!) {
  deleteAlert(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAlertGQL extends Apollo.Mutation<DeleteAlertMutation, DeleteAlertMutationVariables> {
    document = DeleteAlertDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAlertDocument = gql`
    query FindAlert($data: FindAlertInput!) {
  findAlert(data: $data) {
    id
    name
    type
    position
    value
    running
    validity {
      enabled
      from
      to
    }
    background {
      id
      name
      type
      value
      valueType
    }
    borders {
      id
      name
      type
      value
      valueType
    }
    height {
      id
      name
      type
      value
      valueType
    }
    textSize {
      id
      name
      type
      value
      valueType
    }
    textColor {
      id
      name
      type
      value
      valueType
    }
    textPosition {
      id
      name
      type
      value
      valueType
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAlertGQL extends Apollo.Query<FindAlertQuery, FindAlertQueryVariables> {
    document = FindAlertDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateAlertDocument = gql`
    mutation UpdateAlert($id: ID!, $data: UpdateAlertInput!) {
  updateAlert(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAlertGQL extends Apollo.Mutation<UpdateAlertMutation, UpdateAlertMutationVariables> {
    document = UpdateAlertDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllAssetsDocument = gql`
    query FindAllAssets($data: FindAssetInput!) {
  findAllAssets(data: $data) {
    id
    name
    type
    path
    showTime
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllAssetsGQL extends Apollo.Query<FindAllAssetsQuery, FindAllAssetsQueryVariables> {
    document = FindAllAssetsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAssetDocument = gql`
    mutation CreateAsset($data: CreateAssetInput!, $file: FileUpload!) {
  createAsset(data: $data, file: $file) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAssetGQL extends Apollo.Mutation<CreateAssetMutation, CreateAssetMutationVariables> {
    document = CreateAssetDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteAssetDocument = gql`
    mutation DeleteAsset($id: ID!) {
  deleteAsset(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAssetGQL extends Apollo.Mutation<DeleteAssetMutation, DeleteAssetMutationVariables> {
    document = DeleteAssetDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAssetDocument = gql`
    query FindAsset($data: FindAssetInput!) {
  findAsset(data: $data) {
    id
    name
    path
    type
    showTime
    directory {
      id
      name
    }
    tags {
      id
      name
      color
    }
    alert {
      id
      name
    }
    animationIn {
      id
      name
    }
    animationOut {
      id
      name
    }
    validity {
      enabled
      from
      to
    }
    assetLists {
      id
      name
      type
      assets {
        id
        asset {
          id
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAssetGQL extends Apollo.Query<FindAssetQuery, FindAssetQueryVariables> {
    document = FindAssetDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateAssetDocument = gql`
    mutation UpdateAsset($id: ID!, $data: UpdateAssetInput!, $file: FileUpload) {
  updateAsset(id: $id, data: $data, file: $file) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAssetGQL extends Apollo.Mutation<UpdateAssetMutation, UpdateAssetMutationVariables> {
    document = UpdateAssetDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllAssetListsDocument = gql`
    query FindAllAssetLists($data: FindAssetListInput!) {
  findAllAssetLists(data: $data) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllAssetListsGQL extends Apollo.Query<FindAllAssetListsQuery, FindAllAssetListsQueryVariables> {
    document = FindAllAssetListsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AssignAssetToAssetListDocument = gql`
    mutation AssignAssetToAssetList($id: ID!, $data: AssetAssignInput!) {
  assignAssetToAssetList(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AssignAssetToAssetListGQL extends Apollo.Mutation<AssignAssetToAssetListMutation, AssignAssetToAssetListMutationVariables> {
    document = AssignAssetToAssetListDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveAssetFromAssetListDocument = gql`
    mutation RemoveAssetFromAssetList($id: ID!, $asset: ID!) {
  removeAssetFromAssetList(id: $id, assetEntry: $asset) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveAssetFromAssetListGQL extends Apollo.Mutation<RemoveAssetFromAssetListMutation, RemoveAssetFromAssetListMutationVariables> {
    document = RemoveAssetFromAssetListDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAssetListDocument = gql`
    mutation CreateAssetList($data: CreateAssetListInput!) {
  createAssetList(data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAssetListGQL extends Apollo.Mutation<CreateAssetListMutation, CreateAssetListMutationVariables> {
    document = CreateAssetListDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteAssetListDocument = gql`
    mutation DeleteAssetList($id: ID!) {
  deleteAssetList(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAssetListGQL extends Apollo.Mutation<DeleteAssetListMutation, DeleteAssetListMutationVariables> {
    document = DeleteAssetListDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAssetListDocument = gql`
    query FindAssetList($data: FindAssetListInput!) {
  findAssetList(data: $data) {
    id
    name
    type
    prioritized
    enabled
    validity {
      enabled
      from
      to
    }
    assets {
      id
      asset {
        id
        name
        path
      }
      validity {
        enabled
        from
        to
      }
      showTime
      animationIn {
        id
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAssetListGQL extends Apollo.Query<FindAssetListQuery, FindAssetListQueryVariables> {
    document = FindAssetListDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateAssetListDocument = gql`
    mutation UpdateAssetList($id: ID!, $data: UpdateAssetListInput!) {
  updateAssetList(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAssetListGQL extends Apollo.Mutation<UpdateAssetListMutation, UpdateAssetListMutationVariables> {
    document = UpdateAssetListDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeployDocument = gql`
    mutation Deploy {
  deploy {
    versionHash
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeployGQL extends Apollo.Mutation<DeployMutation, DeployMutationVariables> {
    document = DeployDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllDirectoriesDocument = gql`
    query FindAllDirectories($data: FindDirectoryInput!) {
  findAllDirectories(data: $data) {
    id
    name
    parentDirectory {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllDirectoriesGQL extends Apollo.Query<FindAllDirectoriesQuery, FindAllDirectoriesQueryVariables> {
    document = FindAllDirectoriesDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateDirectoryDocument = gql`
    mutation CreateDirectory($data: CreateDirectoryInput!) {
  createDirectory(data: $data) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDirectoryGQL extends Apollo.Mutation<CreateDirectoryMutation, CreateDirectoryMutationVariables> {
    document = CreateDirectoryDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteDirectoryDocument = gql`
    mutation DeleteDirectory($id: ID!) {
  deleteDirectory(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteDirectoryGQL extends Apollo.Mutation<DeleteDirectoryMutation, DeleteDirectoryMutationVariables> {
    document = DeleteDirectoryDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindDirectoryDocument = gql`
    query FindDirectory($data: FindDirectoryInput!) {
  findDirectory(data: $data) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindDirectoryGQL extends Apollo.Query<FindDirectoryQuery, FindDirectoryQueryVariables> {
    document = FindDirectoryDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateDirectoryDocument = gql`
    mutation UpdateDirectory($id: ID!, $data: UpdateDirectoryInput!) {
  updateDirectory(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDirectoryGQL extends Apollo.Mutation<UpdateDirectoryMutation, UpdateDirectoryMutationVariables> {
    document = UpdateDirectoryDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllGroupsDocument = gql`
    query FindAllGroups($data: FindGroupInput!) {
  findAllGroups(data: $data) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllGroupsGQL extends Apollo.Query<FindAllGroupsQuery, FindAllGroupsQueryVariables> {
    document = FindAllGroupsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateGroupDocument = gql`
    mutation CreateGroup($data: CreateGroupInput!) {
  createGroup(data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGroupGQL extends Apollo.Mutation<CreateGroupMutation, CreateGroupMutationVariables> {
    document = CreateGroupDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($id: ID!) {
  deleteGroup(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteGroupGQL extends Apollo.Mutation<DeleteGroupMutation, DeleteGroupMutationVariables> {
    document = DeleteGroupDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindGroupDocument = gql`
    query FindGroup($data: FindGroupInput!) {
  findGroup(data: $data) {
    id
    name
    assetLists {
      id
      name
    }
    alert {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindGroupGQL extends Apollo.Query<FindGroupQuery, FindGroupQueryVariables> {
    document = FindGroupDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateGroupDocument = gql`
    mutation UpdateGroup($id: ID!, $data: UpdateGroupInput!) {
  updateGroup(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateGroupGQL extends Apollo.Mutation<UpdateGroupMutation, UpdateGroupMutationVariables> {
    document = UpdateGroupDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!, $shortSession: Boolean!) {
  login(username: $username, password: $password, shortSession: $shortSession) {
    user {
      id
      username
      role
    }
    token {
      accessToken
      expiresIn
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllPlayersDocument = gql`
    query FindAllPlayers($data: FindPlayerInput!) {
  findAllPlayers(data: $data) {
    id
    name
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllPlayersGQL extends Apollo.Query<FindAllPlayersQuery, FindAllPlayersQueryVariables> {
    document = FindAllPlayersDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePlayerDocument = gql`
    mutation CreatePlayer($data: CreatePlayerInput!) {
  createPlayer(data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePlayerGQL extends Apollo.Mutation<CreatePlayerMutation, CreatePlayerMutationVariables> {
    document = CreatePlayerDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeletePlayerDocument = gql`
    mutation DeletePlayer($id: ID!) {
  deletePlayer(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePlayerGQL extends Apollo.Mutation<DeletePlayerMutation, DeletePlayerMutationVariables> {
    document = DeletePlayerDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindPlayerDocument = gql`
    query FindPlayer($data: FindPlayerInput!) {
  findPlayer(data: $data) {
    id
    name
    token
    group {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindPlayerGQL extends Apollo.Query<FindPlayerQuery, FindPlayerQueryVariables> {
    document = FindPlayerDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePlayerDocument = gql`
    mutation UpdatePlayer($id: ID!, $data: UpdatePlayerInput!) {
  updatePlayer(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePlayerGQL extends Apollo.Mutation<UpdatePlayerMutation, UpdatePlayerMutationVariables> {
    document = UpdatePlayerDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllStylesDocument = gql`
    query FindAllStyles($data: FindStyleInput!) {
  findAllStyles(data: $data) {
    id
    name
    type
    value
    valueType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllStylesGQL extends Apollo.Query<FindAllStylesQuery, FindAllStylesQueryVariables> {
    document = FindAllStylesDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateStyleDocument = gql`
    mutation CreateStyle($data: CreateStyleInput!) {
  createStyle(data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateStyleGQL extends Apollo.Mutation<CreateStyleMutation, CreateStyleMutationVariables> {
    document = CreateStyleDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteStyleDocument = gql`
    mutation DeleteStyle($id: ID!) {
  deleteStyle(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteStyleGQL extends Apollo.Mutation<DeleteStyleMutation, DeleteStyleMutationVariables> {
    document = DeleteStyleDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindStyleDocument = gql`
    query FindStyle($data: FindStyleInput!) {
  findStyle(data: $data) {
    id
    name
    type
    value
    valueType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindStyleGQL extends Apollo.Query<FindStyleQuery, FindStyleQueryVariables> {
    document = FindStyleDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateStyleDocument = gql`
    mutation UpdateStyle($id: ID!, $data: UpdateStyleInput!) {
  updateStyle(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateStyleGQL extends Apollo.Mutation<UpdateStyleMutation, UpdateStyleMutationVariables> {
    document = UpdateStyleDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllTagsDocument = gql`
    query FindAllTags($data: FindTagInput!) {
  findAllTags(data: $data) {
    id
    name
    color
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllTagsGQL extends Apollo.Query<FindAllTagsQuery, FindAllTagsQueryVariables> {
    document = FindAllTagsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTagDocument = gql`
    mutation CreateTag($data: CreateTagInput!) {
  createTag(data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTagGQL extends Apollo.Mutation<CreateTagMutation, CreateTagMutationVariables> {
    document = CreateTagDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTagDocument = gql`
    mutation DeleteTag($id: ID!) {
  deleteTag(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTagGQL extends Apollo.Mutation<DeleteTagMutation, DeleteTagMutationVariables> {
    document = DeleteTagDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindTagDocument = gql`
    query FindTag($data: FindTagInput!) {
  findTag(data: $data) {
    id
    name
    color
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindTagGQL extends Apollo.Query<FindTagQuery, FindTagQueryVariables> {
    document = FindTagDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTagDocument = gql`
    mutation UpdateTag($id: ID!, $data: UpdateTagInput!) {
  updateTag(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTagGQL extends Apollo.Mutation<UpdateTagMutation, UpdateTagMutationVariables> {
    document = UpdateTagDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllUsersDocument = gql`
    query FindAllUsers($data: FindUserInput!) {
  findAllUsers(data: $data) {
    id
    username
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllUsersGQL extends Apollo.Query<FindAllUsersQuery, FindAllUsersQueryVariables> {
    document = FindAllUsersDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    document = DeleteUserDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindUserDocument = gql`
    query FindUser($data: FindUserInput!) {
  findUser(data: $data) {
    id
    username
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindUserGQL extends Apollo.Query<FindUserQuery, FindUserQueryVariables> {
    document = FindUserDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
  updateUser(id: $id, data: $data) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
