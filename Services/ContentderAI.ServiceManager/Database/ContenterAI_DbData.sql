--create table [#tempSettingValue] (
--[SettingValueID] [int] identity,
--[SettingType] [nvarchar] (100),
--[SettingTypeID] [int],
--[SettingKey] [nvarchar] (256),
--[SettingValue] [nvarchar] (256) NULL,
--[IsActive] [bit] NULL,
--[IsModified] [bit] NULL,
--[AddedOn] [datetime] NULL,
--[UpdatedOn] [datetime] NULL,
--[AddedBy] [nvarchar] (256) NULL,
--[UpdatedBy] [nvarchar] (256) NULL,
--[IsCacheable] [bit] NULL,
--[PortalID] [int] NULL,
--[Visible] [bit] NULL);



set identity_insert [SettingValue] on;


insert [SettingValue] ([SettingValueID],[SettingType],[SettingTypeID],[SettingKey],[SettingValue],[IsActive],[IsModified],[AddedOn],[UpdatedOn],[AddedBy],[UpdatedBy],[IsCacheable],[PortalID],[Visible])
select 1,'SiteAdmin',1,'TextAnalyticsEndpoint','https://textanalyticstemplate.cognitiveservices.azure.com/',1,0,'2020-08-07 08:58:53.027','2020-08-07 08:58:53.027',NULL,NULL,1,NULL,NULL UNION ALL
select 2,'SiteAdmin',1,'TextAnalyticsSecret','83df855117a04084a9e7d85327ed383f',1,0,'2020-08-07 09:47:25.380','2020-08-07 09:47:25.380',NULL,NULL,1,NULL,NULL;

set identity_insert [SettingValue] off;