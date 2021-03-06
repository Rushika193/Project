/****** Object:  Table [dbo].[WebbuilderDynamicComponent]    Script Date: 1/10/2019 1:12:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WebbuilderDynamicComponent]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[WebbuilderDynamicComponent](
	[ComponentID] [int] IDENTITY(1,1) NOT NULL,
	[ComponentName] [nvarchar](50) NULL,
	[ComponentValue] [nvarchar](max) NULL,
	[ComponentViewValue] [nvarchar](max) NULL,
	[UserModuleID] [int] NULL,
	[UniversalComponentID] [bigint] NULL,
	[Version] [decimal](16, 2) NULL,
	[Type] [nvarchar](250) NULL,
	[SiteID] [int] NOT NULL,
 CONSTRAINT [PK_WebbuilderDynamicComponent] PRIMARY KEY CLUSTERED 
(
	[ComponentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF_WebbuilderDynamicComponent_UniversalComponentID]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[WebbuilderDynamicComponent] ADD  CONSTRAINT [DF_WebbuilderDynamicComponent_UniversalComponentID]  DEFAULT ((0)) FOR [UniversalComponentID]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF_WebbuilderDynamicComponent_SiteID]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[WebbuilderDynamicComponent] ADD  CONSTRAINT [DF_WebbuilderDynamicComponent_SiteID]  DEFAULT ((0)) FOR [SiteID]
END
GO

/****** Object:  Table [dbo].[WebBuilder_DynamicPostData]    Script Date: 11/21/2018 4:30:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WebBuilder_DynamicPostData]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[WebBuilder_DynamicPostData](
	[PostDataId] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NOT NULL,
    [PostKey] [nvarchar](50) NOT NULL,
	[JsonData] [nvarchar](max) NULL,
	[SiteId] [int] NOT NULL,
	[Order] [int] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[AddedOn] [datetime] NOT NULL,
	[IsActive] [bit] NULL,
	[DeletedOn] [datetime] NULL,
	[DeletedBy] [nvarchar](256) NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[UpdatedOn] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[WebBuilder_DynamicPostType]    Script Date: 11/21/2018 4:30:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WebBuilder_DynamicPostType]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[WebBuilder_DynamicPostType](
	[PostId] [int] IDENTITY(1,1) NOT NULL,
    [PostKey] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Form] [nvarchar](max) NULL,
	[ComponentDataList] [nvarchar](max) NULL,
    [ComponentDataListView] [nvarchar](max) NULL,
	[ComponentDataDetail] [nvarchar](max) NULL,
    [ComponentDataDetailView] [nvarchar](max) NULL,
	[HasDetail] [bit] NULL,
	[IsPublished] [bit] NOT NULL,
	[IsActive] [bit] NULL,
	[SiteId] [int] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[AddedOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[DeletedOn] [datetime] NULL,
	[DeletedBy] [nvarchar](256) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[WebBuilder_DynamicTemplate]    Script Date: 11/21/2018 4:30:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[WebBuilder_DynamicTemplate]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[WebBuilder_DynamicTemplate](
	[TemplateId] [int] IDENTITY(1,1) NOT NULL,
    [TemplateKey] [nvarchar](50) NOT NULL,
	[PostId] [int] NOT NULL,
    [PostKey] [nvarchar](50) NOT NULL,
	[SiteId] [int] NOT NULL,
	[Type] [nvarchar](20) NULL,
	[TemplateName] [nvarchar](256) NULL,
	[Screenshot] [nvarchar](256) NULL,
	[TemplateEditDom] [nvarchar](max) NULL,
	[TemplateViewDom] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[AddedOn] [datetime] NOT NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[DeletedBy] [nvarchar](256) NULL,
	[DeletedOn] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__WebBuilde__Added__28C2F59F]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[WebBuilder_DynamicPostData] ADD  DEFAULT (getutcdate()) FOR [AddedOn]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__WebBuilde__IsPub__29B719D8]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[WebBuilder_DynamicPostType] ADD  DEFAULT ((0)) FOR [IsPublished]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__WebBuilde__Added__2AAB3E11]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[WebBuilder_DynamicPostType] ADD  DEFAULT (getutcdate()) FOR [AddedOn]
END
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DF__WebBuilde__Added__2B9F624A]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[WebBuilder_DynamicTemplate] ADD  DEFAULT (getutcdate()) FOR [AddedOn]
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPost_GetImages]    Script Date: 1/10/2019 3:32:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPost_GetImages]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPost_GetImages] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPost_GetImages] 
	@SiteID int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT JsonData AS ImagePath, 0 AS RelativePath FROM dbo.WebBuilder_DynamicPostData WHERE SiteId=@SiteID
	UNION
	SELECT TemplateViewDom AS ImagePath, 0 AS RelativePath FROM dbo.WebBuilder_DynamicTemplate WHERE SiteId=@SiteID
	UNION
	SELECT Screenshot AS ImagePath, 1 AS RelativePath FROM dbo.WebBuilder_DynamicTemplate WHERE SiteId=@SiteID
END
GO

/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostData_AddNewPostData]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostData_AddNewPostData]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_AddNewPostData] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_AddNewPostData]
@PostId int,
@PostKey NVARCHAR(50),
@JsonData NVARCHAR(MAX),
@SiteId int,
@IsActive BIT,
@AddedBy NVARCHAR(256)
AS
BEGIN
IF(ISJSON(@JSONdata)>0)
	BEGIN
	DECLARE @maxOrder INT
	SET @maxOrder= ISNULL((SELECT MAX([Order]) FROM dbo.WebBuilder_DynamicPostData WHERE PostId=@PostId),0)
		INSERT INTO dbo.WebBuilder_DynamicPostData(PostId,PostKey,JSONdata,SiteId,[order],IsActive,AddedBy)
		VALUES (@PostId,@PostKey,@JSONdata,@SiteId,@maxOrder+1,@IsActive,@AddedBy)
	END
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostData_ClonePostData]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostData_ClonePostData]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_ClonePostData] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_ClonePostData]
@PostDataId INT,
@SiteId INT,
@AddedBy NVARCHAR(256)
AS
BEGIN
	DECLARE 
		@PostId INT,
        @PostKey nvarchar(50),
		@JsonData NVARCHAR(MAX)
	SELECT 
		@PostId=PostId,
        @PostKey=PostKey,
		@JsonData=JsonData 
	FROM dbo.WebBuilder_DynamicPostData
	WHERE 
		PostDataId=@PostDataId 
		AND SiteId=@SiteID

	EXEC dbo.usp_WebBuilder_DynamicPostData_AddNewPostData @PostId,@PostKey,@JsonData,@SiteId,1,@AddedBy
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostData_DeletePostData]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostData_DeletePostData]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_DeletePostData] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_DeletePostData]
@PostDataId int,
@SiteId int,
@DeletedBy nvarchar(256)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.WebBuilder_DynamicPostData WHERE PostDataId=@PostDataId AND IsActive=1)
		BEGIN
			UPDATE dbo.WebBuilder_DynamicPostData
			SET
			IsActive=0,
			DeletedBy=@DeletedBy,
			DeletedOn=GETUTCDATE(),
			[Order]=NULL
			WHERE
			PostDataId=@PostDataId AND SiteId=@SiteId
			-------DECREEASE ORDER BY 1 FOR ALL Next Higer Order Rows
			UPDATE dbo.WebBuilder_DynamicPostData
			SET
			[Order]=[Order]-1
			WHERE 
			PostDataId>@PostDataId
			AND IsActive=1 AND SiteId=@SiteId
		END
	ELSE
		PRINT N'Post Not Found'
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataById]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostData_GetPostDataById]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataById] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataById]
	@PostDataId int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT PostDataId,PostId,PostKey,JsonData,SiteId from dbo.WebBuilder_DynamicPostData where PostDataId=@PostDataId AND IsActive=1
END

GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataByKey]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostData_GetPostDataByKey]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataByKey] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataByKey]
	@PostKey nvarchar(50),
	@SiteId int,
	@Offset int,
	@Limit int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT PostDataId, PostId, PostKey, JSONdata,SiteId, [Order]
	FROM dbo.WebBuilder_DynamicPostData
	WHERE 
	PostKey=@PostKey
	AND
	SiteId=@SiteId
	AND
	IsActive=1
	ORDER BY [Order] ASC
	OFFSET @Offset ROWS
	FETCH NEXT @Limit ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataByPostId]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostData_GetPostDataByPostId]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataByPostId] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_GetPostDataByPostId]
@PostId int,
@SiteId int,
@Offset int,
@Limit int
AS
BEGIN
	SELECT PostDataId, PostId, PostKey, JSONdata,SiteId, [Order], IsActive, AddedBy,AddedOn,UpdatedBy,UpdatedOn
	FROM dbo.WebBuilder_DynamicPostData
	WHERE 
	PostId=@PostId
	AND
	SiteId=@SiteId
	AND
	IsActive=1
	ORDER BY [Order] ASC
	OFFSET @Offset ROWS
	FETCH NEXT @Limit ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostData_UpdatePostData]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostData_UpdatePostData]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_UpdatePostData] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_UpdatePostData]
@PostDataId INT,
@SiteId int,
@JSONdata NVARCHAR(MAX),
@UpdatedBy NVARCHAR(256)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.WebBuilder_DynamicPostData WHERE PostDataId=@PostDataId)
	BEGIN
		--IF(ISJSON(@JSONdata)>0)
		--BEGIN
			UPDATE dbo.WebBuilder_DynamicPostData
			SET
			JSONdata=@JSONdata,
			UpdatedBy=@UpdatedBy,
			UpdatedOn=GETUTCDATE()
			WHERE PostDataId=@PostDataId AND SiteId=@SiteId
		--END
		--ELSE
			--PRINT N'Error: Not A Valid JSON'
	END
	ELSE
		PRINT N'Post Data Not Found'
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostData_UpdatePostDataOrder]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostData_UpdatePostDataOrder]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_UpdatePostDataOrder] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostData_UpdatePostDataOrder]
@Order NVARCHAR(MAX)
AS
BEGIN
	IF OBJECT_ID('tempdb..#TempOrderTable') IS NOT NULL DROP TABLE #TempOrderTable
	CREATE TABLE #TempOrderTable
	(
		PostDataId int,
		[Order] int
	)
	INSERT INTO #TempOrderTable SELECT [key] as PostDataId, [value] as [Order] FROM OPENJSON(@Order)

	UPDATE dbo.WebBuilder_DynamicPostData 
	SET WebBuilder_DynamicPostData.[Order]= #TempOrderTable.[Order]
	FROM dbo.WebBuilder_DynamicPostData INNER JOIN #TempOrderTable
	ON dbo.WebBuilder_DynamicPostData.PostDataId=#TempOrderTable.PostDataId
	WHERE
	dbo.WebBuilder_DynamicPostData.PostDataId=#TempOrderTable.[PostDataId]
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_AddNewPost]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_AddNewPost]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_AddNewPost] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_AddNewPost]
@PostKey NVARCHAR(50),
@SiteId int,
@Name NVARCHAR(256),
@Form NVARCHAR(MAX),
@HasDetail BIT,
@IsActive BIT,
@AddedBy NVARCHAR(256),
@ComponentDataList NVARCHAR(MAX),
@ComponentDataDetail NVARCHAR(MAX),
@ComponentDataListView NVARCHAR(MAX),
@ComponentDataDetailView NVARCHAR(MAX)
AS
BEGIN
    IF NOT EXISTS(SELECT 1 FROM dbo.WebBuilder_DynamicPostType WHERE Name=@Name AND SiteId=@SiteId AND IsActive=1)
    BEGIN
		INSERT INTO dbo.WebBuilder_DynamicPostType(PostKey, SiteId,Name,Form,HasDetail,IsActive,AddedBy,ComponentDataList,ComponentDataDetail,ComponentDataListView,ComponentDataDetailView)
		VALUES (@PostKey,@SiteId,@Name,@Form,@HasDetail,@IsActive,@AddedBy,@ComponentDataList,@ComponentDataDetail,@ComponentDataListView,@ComponentDataDetailView)
    END
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_CheckHasDetailTemplate]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_CheckHasDetailTemplate]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_CheckHasDetailTemplate] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_CheckHasDetailTemplate]
@PostId INT
AS
BEGIN
	SELECT HasDetail From dbo.WebBuilder_DynamicPostType Where PostId=@PostId
	END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_ClonePost]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_ClonePost]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_ClonePost] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_ClonePost]
@PostId int,
@PostKey nvarchar(50),
@SiteId int,
@AddedBy nvarchar(256)
AS
BEGIN
	Declare @Name nvarchar(256)
	Declare @Form nvarchar(max)
	Declare @HasDetail bit
	Declare @CloneName nvarchar(256)
	Declare @Count int
	Declare @NameLike nvarchar(256)
	Declare @ClonePostTypeId int
	
    Select @Name=Name,@Form=Form, @HasDetail=HasDetail from dbo.WebBuilder_DynamicPostType where PostId=@PostId AND SiteId=@SiteId AND IsActive=1
	
    Set @NameLike = @Name + '%'
	Set @Count = (Select COUNT(PostId) from dbo.WebBuilder_DynamicPostType where Name LIKE @NameLike)
	Set @CloneName = LTRIM(RTRIM(@Name)) + ' Clone' + LTRIM(STR(@Count))
	
    Insert into dbo.WebBuilder_DynamicPostType(PostKey, Name,Form,HasDetail,SiteId,IsActive,IsPublished,AddedBy,AddedOn)
	values(@PostKey, @CloneName,@Form,@HasDetail,@SiteId,1,0,@AddedBy, GETUTCDATE())
	
    Set @ClonePostTypeId = SCOPE_IDENTITY()
	
    Insert into dbo.WebBuilder_DynamicTemplate(TemplateKey, PostId, PostKey, SiteId, Type, TemplateName,Screenshot,TemplateEditDom,TemplateViewDom,IsActive,AddedBy)
	Select TemplateKey + '-' + CONVERT(varchar, @ClonePostTypeId), @ClonePostTypeId, @PostKey, @SiteId, Type, TemplateName,'',TemplateEditDom,TemplateViewDom, 1, @AddedBy From dbo.WebBuilder_DynamicTemplate Where PostId=@PostId AND SiteId=@SiteId AND IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_CloneTemplate]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_CloneTemplate]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_CloneTemplate] AS' 
END
GO

ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_CloneTemplate]
	@TemplateId int,
    @TemplateKey nvarchar(50),
    @Screenshot nvarchar(256),
	@SiteId int,
	@AddedBy nvarchar(256)
AS
BEGIN
	Insert into dbo.WebBuilder_DynamicTemplate(TemplateKey, PostId, PostKey, SiteId, Type, TemplateName,Screenshot,TemplateEditDom,TemplateViewDom,IsActive,AddedBy)
	Select @TemplateKey, PostId, PostKey, SiteId, Type, TemplateName + ' Cloned', @Screenshot,TemplateEditDom,TemplateViewDom, 1, @AddedBy From dbo.WebBuilder_DynamicTemplate Where TemplateId=@TemplateId AND SiteId=@SiteId AND IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_DeletePost]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_DeletePost]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_DeletePost] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_DeletePost]
@PostId int,
@SiteId int,
@DeletedBy nvarchar(256)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.WebBuilder_DynamicPostType WHERE PostId=@PostId AND IsPublished=0)
		BEGIN
			UPDATE dbo.WebBuilder_DynamicPostType
			SET 
			IsActive=0,
			DeletedBy=@DeletedBy,
			DeletedOn=GETUTCDATE()
			WHERE PostId=@PostId AND SiteId=@SiteId AND IsPublished=0
		END
	ELSE
		PRINT N'Post Not Found'
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_GetFormByPostId]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_GetFormByPostId]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetFormByPostId] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetFormByPostId]
@PostId INT
AS
BEGIN
	SELECT Form
	FROM dbo.WebBuilder_DynamicPostType
	WHERE PostId=@PostId
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_GetPost]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_GetPost]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPost] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPost]
@SiteId int
AS
BEGIN
	SELECT PostId, PostKey, Name, Form, HasDetail, IsActive, IsPublished,AddedBy, UpdatedBy,DeletedBy, AddedOn,UpdatedOn,DeletedOn
	FROM dbo.WebBuilder_DynamicPostType
	WHERE IsActive=1 AND SiteId=@SiteId
    ORDER BY PostId ASC
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_GetPostAndId]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_GetPostAndId]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPostAndId] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPostAndId]
AS
BEGIN
	SELECT PostId, Name
	FROM dbo.WebBuilder_DynamicPostType
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_GetPostById]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_GetPostById]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPostById] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPostById]
@PostId int,
@SiteId int
AS
BEGIN
	SELECT PostId, PostKey, Name, Form, HasDetail, IsActive, IsPublished, ComponentDataList, ComponentDataDetail,AddedBy, UpdatedBy,DeletedBy, AddedOn,UpdatedOn,DeletedOn
	FROM dbo.WebBuilder_DynamicPostType
	WHERE PostId=@PostId AND SiteId=@SiteId AND IsActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_GetPostNameByPostId]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_GetPostNameByPostId]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPostNameByPostId] AS' 
END
GO
ALTER procedure [dbo].[usp_WebBuilder_DynamicPostType_GetPostNameByPostId]
@PostId INT
AS
BEGIN
	SELECT [Name] FROM dbo.WebBuilder_DynamicPostType WHERE PostId=@PostId
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_PublishPost]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_PublishPost]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_PublishPost] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_PublishPost]
	@PostId INT,
	@SiteId int,
	@ComponentDataList NVARCHAR(MAX),
	@ComponentDataDetail NVARCHAR(MAX),
    @ComponentDataListView NVARCHAR(MAX),
	@ComponentDataDetailView NVARCHAR(MAX)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.WebBuilder_DynamicPostType WHERE PostId=@PostId)
	BEGIN
			Declare @PostComponentName nvarchar(50)
			Declare @ComponentNameList nvarchar(50)
			Declare @ComponentNameDetail nvarchar(50)
			Declare @HasDetail int
			Declare @UserModuleID int
			Declare @UniversalComponentID int

			Select @UserModuleID=UserModuleID, @UniversalComponentID=MAX(UniversalComponentID) from dbo.WebbuilderComponent GROUP BY UserModuleID

			UPDATE dbo.WebBuilder_DynamicPostType
			SET
			ComponentDataList=@ComponentDataList,
			ComponentDataDetail=@ComponentDataDetail,
            ComponentDataListView=@ComponentDataListView,
			ComponentDataDetailView=@ComponentDataDetailView,
			IsPublished=1
			WHERE PostId=@PostId And IsActive=1 AND SiteId=@SiteId

			Select @PostComponentName=Name, @HasDetail=HasDetail from dbo.WebBuilder_DynamicPostType WHERE PostId=@PostId And IsActive=1 AND IsPublished=1 AND SiteId=@SiteId
			Set @ComponentNameList=Convert(nvarchar(50), @PostComponentName) + ' List'
			Set @ComponentNameDetail=Convert(nvarchar(50), @PostComponentName) + ' Detail'

			Delete from dbo.WebbuilderDynamicComponent where (ComponentName=@ComponentNameList OR ComponentName=@ComponentNameDetail) AND SiteId=@SiteId

			Insert into dbo.WebbuilderDynamicComponent(ComponentName,ComponentValue,ComponentViewValue,UserModuleID,UniversalComponentID,SiteId,Version,Type) values (@ComponentNameList,@ComponentDataList,@ComponentDataListView,@UserModuleID,0, @SiteId, 0.00, 'dynamic_post')
			IF(@HasDetail=1)
				Insert into dbo.WebbuilderDynamicComponent(ComponentName,ComponentValue,ComponentViewValue,UserModuleID,UniversalComponentID,SiteId,Version,Type) values (@ComponentNameDetail,@ComponentDataDetail,@ComponentDataDetailView,@UserModuleID,0, @SiteId, 0.00, 'dynamic_post')
	END
	ELSE
		PRINT N'Post Not Found'
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_UpdatePost]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_UpdatePost]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_UpdatePost] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_UpdatePost]
@PostId INT,
@SiteId INT,
@Name NVARCHAR(256),
@Form NVARCHAR(MAX),
@HasDetail BIT,
@UpdatedBy NVARCHAR(256),
@ComponentDataList NVARCHAR(MAX),
@ComponentDataDetail NVARCHAR(MAX),
@ComponentDataListView NVARCHAR(MAX),
@ComponentDataDetailView NVARCHAR(MAX)
AS
BEGIN
    DECLARE @RowId int
    DECLARE @IsPublished bit
    SELECT @RowId=PostId, @IsPublished=IsPublished FROM dbo.WebBuilder_DynamicPostType WHERE PostId=@PostId AND SiteId=@SiteId AND IsActive=1
    IF(@RowId IS NOT NULL)
        BEGIN
            IF(@IsPublished=0)
                BEGIN
                    UPDATE dbo.WebBuilder_DynamicPostType
			        SET
			        Name=@Name,
			        Form=@Form,
			        HasDetail=@HasDetail,
			        UpdatedBy=@UpdatedBy,
                    ComponentDataList=@ComponentDataList,
                    ComponentDataDetail=@ComponentDataDetail,
                    ComponentDataListView=@ComponentDataListView,
                    ComponentDataDetailView=@ComponentDataDetailView
			        WHERE PostId=@RowId
                END
            ELSE
                BEGIN
                    UPDATE dbo.WebBuilder_DynamicPostType
			        SET
			        Form=@Form,
			        UpdatedBy=@UpdatedBy,
                    ComponentDataList=@ComponentDataList,
                    ComponentDataDetail=@ComponentDataDetail,
                    ComponentDataListView=@ComponentDataListView,
                    ComponentDataDetailView=@ComponentDataDetailView
			        WHERE PostId=@RowId
                END
        END
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicTemplate_AddNewTemplate]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicTemplate_AddNewTemplate]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_AddNewTemplate] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_AddNewTemplate]
@TemplateKey nvarchar(50),
@PostId int,
@PostKey nvarchar(50),
@SiteId int,
@TemplateName nvarchar(256),
@TemplateViewDom nvarchar(max),
@TemplateEditDom nvarchar(max),
@Screenshot nvarchar(256),
@IsActive BIT,
@AddedBy NVARCHAR(256),
@Type nvarchar(20),
@CreatedTemplateId int OUT
AS
BEGIN
--IF(ISJSON(@TemplateData)>0)
	--BEGIN
		INSERT INTO dbo.WebBuilder_DynamicTemplate(TemplateKey, PostId, PostKey, TemplateName, TemplateEditDom, TemplateViewDom, Screenshot, SiteId, IsActive, AddedBy, Type)
		VALUES (@TemplateKey, @PostId, @PostKey, @TemplateName, @TemplateEditDom, @TemplateViewDom, @Screenshot, @SiteId, @IsActive, @AddedBy, @Type)
        Set @CreatedTemplateId = SCOPE_IDENTITY()
	--END
	--ELSE
		--PRINT N'Invalid Template data format'
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicTemplate_DeleteTemplate]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicTemplate_DeleteTemplate]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_DeleteTemplate] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_DeleteTemplate]
@TemplateId int,
@SiteId int,
@DeletedBy nvarchar(256)
AS
BEGIN
	IF EXISTS(SELECT 1 FROM dbo.WebBuilder_DynamicTemplate WHERE TemplateId=@TemplateId)
		BEGIN
			UPDATE dbo.WebBuilder_DynamicTemplate
			SET IsActive=0,
			DeletedBy=@DeletedBy
			WHERE TemplateId=@TemplateId AND SiteId=@SiteId
		END
	ELSE
		PRINT N'Post Not Found'
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicTemplate_GetAllPostTemplates]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicTemplate_GetAllPostTemplates]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_GetAllPostTemplates] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_GetAllPostTemplates] 
	@PostId int,
	@SiteId int,
	@Type nvarchar(20)= NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT TemplateId,PostId,PostKey,TemplateName,[Type],Screenshot, TemplateViewDom 
    FROM dbo.WebBuilder_DynamicTemplate 
    WHERE SiteId=@SiteId AND PostId=@PostId AND IsActive=1 AND ([Type]=@Type OR @Type IS NULL)
    ORDER BY TemplateId ASC
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicTemplate_GetAllPostTemplatesByKey]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicTemplate_GetAllPostTemplatesByKey]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_GetAllPostTemplatesByKey] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_GetAllPostTemplatesByKey]
	@PostKey nvarchar(50),
	@SiteId int,
	@Type nvarchar(20)= NULL
AS
BEGIN
	SET NOCOUNT ON;
	SELECT TemplateId,TemplateKey,PostId,PostKey,TemplateName,[Type],Screenshot, TemplateViewDom 
    FROM dbo.WebBuilder_DynamicTemplate 
    WHERE SiteId=@SiteId AND PostKey=@PostKey AND IsActive=1 AND ([Type]=@Type OR @Type IS NULL)
    ORDER BY TemplateId ASC
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicTemplate_GetTemplate]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicTemplate_GetTemplate]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_GetTemplate] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_GetTemplate]
AS
BEGIN
	SELECT TemplateId, PostId, PostKey, TemplateName, Screenshot,SiteId, [Type], IsActive, AddedBy,AddedOn, UpdatedBy, UpdatedOn,DeletedBy, DeletedOn
	FROM dbo.WebBuilder_DynamicTemplate
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicTemplate_GetTemplateById]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicTemplate_GetTemplateById]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_GetTemplateById] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_GetTemplateById] 
	@TemplateId int,
	@SiteId int
AS
BEGIN
	SET NOCOUNT ON; 
	SELECT [TemplateId]
      ,[PostId]
      ,[PostKey]
      ,[SiteId]
      ,[TemplateViewDom]
      ,[IsActive]
      ,[Type]
      ,[TemplateName]
      ,[Screenshot]
      ,[TemplateEditDom] from dbo.WebBuilder_DynamicTemplate where TemplateId=@TemplateId AND SiteId=@SiteId
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicTemplate_UpdateTemplate]    Script Date: 1/9/2019 12:32:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicTemplate_UpdateTemplate]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_UpdateTemplate] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicTemplate_UpdateTemplate]
@TemplateId INT,
@SiteId int,
@TemplateName nvarchar(256),
@TemplateViewDom nvarchar(max),
@TemplateEditDom nvarchar(max),
@Screenshot nvarchar(256),
@UpdatedBy NVARCHAR(256)
AS
BEGIN
	UPDATE dbo.WebBuilder_DynamicTemplate
			SET
			TemplateName=@TemplateName,
			TemplateEditDom=@TemplateEditDom,
			TemplateViewDom=@TemplateViewDom,
			Screenshot=@Screenshot,
			UpdatedBy=@UpdatedBy
			WHERE TemplateId=@TemplateId AND SiteId=@SiteId
END
GO
/****** Object:  StoredProcedure [dbo].[usp_WebBuilder_DynamicPostType_GetPostByPostKey]    Script Date: 1/14/2019 12:27:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_WebBuilder_DynamicPostType_GetPostByPostKey]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPostByPostKey] AS' 
END
GO
ALTER PROCEDURE [dbo].[usp_WebBuilder_DynamicPostType_GetPostByPostKey] 
	@PostKey nvarchar(256),
	@SiteId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT PostId, PostKey, Name, Form, HasDetail, IsActive, IsPublished, ComponentDataList, ComponentDataDetail,AddedBy, UpdatedBy,DeletedBy, AddedOn,UpdatedOn,DeletedOn
	FROM dbo.WebBuilder_DynamicPostType
	WHERE PostKey=@PostKey AND SiteId=@SiteId AND IsActive=1
END
GO
