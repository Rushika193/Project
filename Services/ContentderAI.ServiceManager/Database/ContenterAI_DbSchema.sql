-- Create a new database called 'ContentderAI'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
	SELECT [name]
		FROM sys.databases
		WHERE [name] = N'ContentderAI'
)
CREATE DATABASE ContentderAI
GO

USE ContentderAI
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SettingValue](
	[SettingValueID] [int] IDENTITY(1,1) NOT NULL,
	[SettingType] [nvarchar](100) NOT NULL,
	[SettingTypeID] [int] NOT NULL,
	[SettingKey] [nvarchar](256) NOT NULL,
	[SettingValue] [nvarchar](256) NULL,
	[IsActive] [bit] NULL,
	[IsModified] [bit] NULL,
	[AddedOn] [datetime] NULL,
	[UpdatedOn] [datetime] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[IsCacheable] [bit] NULL,
	[PortalID] [int] NULL,
	[Visible] [bit] NULL,
 CONSTRAINT [PK_SettingValue] PRIMARY KEY CLUSTERED 
(
	[SettingType] ASC,
	[SettingTypeID] ASC,
	[SettingKey] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SettingValue] ADD  CONSTRAINT [DF_SettingValue_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[SettingValue] ADD  CONSTRAINT [DF_SettingValue_IsModified]  DEFAULT ((0)) FOR [IsModified]
GO
ALTER TABLE [dbo].[SettingValue] ADD  CONSTRAINT [DF_SettingValue_AddedOn]  DEFAULT (getdate()) FOR [AddedOn]
GO
ALTER TABLE [dbo].[SettingValue] ADD  CONSTRAINT [DF_SettingValue_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]
GO
ALTER TABLE [dbo].[SettingValue] ADD  CONSTRAINT [DF_SettingValue_IsCacheable]  DEFAULT ((0)) FOR [IsCacheable]
GO

/****** Object:  StoredProcedure [dbo].[usp_Webbuilder_Settings_Getall]    Script Date: 7/23/2020 11:38:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Bijaya Baniya>
-- Create date: <Create Date,,4/10/2020>
-- Description:	<Description,, Selects all the settings keyvalue>
-- =============================================
CREATE PROCEDURE [dbo].[usp_Webbuilder_Settings_Getall]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	select SettingKey as SettingKey,
	SettingValue from 
	dbo.SettingValue
	where IsActive =1  and IsCacheable =1
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Webbuilder_Settings_GetByKeys]    Script Date: 7/23/2020 11:38:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Bijaya Baniya>
-- Create date: <Create Date,,5/20/2020>
-- Description:	<Description,, Selects all the settings keyvalue>
-- =============================================
--
CREATE PROCEDURE [dbo].[usp_Webbuilder_Settings_GetByKeys]
@Keys nvarchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	select SV.SettingKey as SettingKey,
	SV.SettingValue from 
	dbo.SettingValue AS SV
	where IsActive =1 and 
	EXISTS(SELECT value FROM STRING_SPLIT(@Keys,',') WHERE value= SV.SettingKey)
	--SettingKey IN( Select value from string_split(@keys,','))
END
GO

-- =============================================
-- Author:		<Author,,Bijaya Baniya>
-- Create date: <Create Date,,4/10/2020>
-- Description:	<Description,, returns setting key value by key>
-- =============================================
CREATE PROCEDURE [dbo].[usp_webbuilder_settings_getbykey]
@SettingKey NVARCHAR(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	select  SettingKey as [Key],
			SettingValue  as [Value] from 
			dbo.SettingValue
	WHERE SettingKey = @SettingKey and 
	 IsActive =1 
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Webbuilder_Settings_UpdateValue]    Script Date: 7/23/2020 11:38:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Bijaya Baniya>
-- Create date: <Create Date,,5/20/2020>
-- Description:	<Description,, Updates settingValue of individual key>
-- =============================================
--
CREATE PROCEDURE [dbo].[usp_Webbuilder_Settings_UpdateValue]
@SettingKey nvarchar(max),
@SettingValue nvarchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	Update dbo.SettingValue
	set SettingValue = @SettingValue
	Where SettingKey = @SettingKey
END
GO