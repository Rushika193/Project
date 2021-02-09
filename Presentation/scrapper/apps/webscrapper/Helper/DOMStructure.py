import numpy


class DOMStructure:

    def decendent(self, selector):
        node = selector.find_elements_by_xpath("*")
        return node

    def checkClass(self, classes, checkClass):
        return classes.find(checkClass) != -1

    def has_background_image(self, element):
        row_bg_image = element.value_of_css_property('background-image')
        if(row_bg_image != 'none'):
            return True
        else:
            return False

    def row_cols(self, row):
        cCols = []
        selector = row
        # multiple editor-row-container is possible in certain row such as milestone
        editor_row_container = selector.find_elements_by_class_name(
            'editor-row-container')
        if(len(editor_row_container) > 1):
            selector = editor_row_container
        editor_row_shaded_layer = selector.find_elements_by_class_name(
            'editor-row-shaded-layer')
        if(len(editor_row_shaded_layer) > 1):
            selector = editor_row_shaded_layer
        cGrid = selector.find_element_by_css_selector('.cGrid')
        cGrid_divs = self.decendent(cGrid)
        for cGrid_div in cGrid_divs:
            if(self.checkClass(cGrid_div.get_attribute('class'), 'cCol')):
                cCols.append(cGrid_div)
        return cCols

    def col_traverse(self, col, background_image_list):
        structure = []  # Holds inner structure of the element
        components = []  # Holds inner components of the element
        nodes = []  # Holds immediate child nodes of the element

        # Get all immediate child nodes of the given element
        childs = self.decendent(col)

        for child in childs:
            current_node = {}
            properties = {}

            # Get the class of the element
            child_class = child.get_attribute('class')

            # Check if the node element has "editor-component" or "cCol" class
            if(self.checkClass(child_class, 'editor-component') or self.checkClass(child_class, 'cCol')):
                background_image = self.has_background_image(child)
                if(background_image):
                    properties['backgroundImage'] = background_image
                    background_image_list.append('image')
                else:
                    properties['backgroundImage'] = background_image
                data_type = child.get_attribute('data-type')
                nodes.append(data_type)
                components.append(data_type)
                current_node['type'] = data_type
            else:
                current_node['type'] = "unknown"

            # Check for inner node
            r_structure, r_components, r_nodes = self.col_traverse(
                child, background_image_list)
            components.extend(r_components)
            current_node['properties'] = properties
            current_node['components'] = r_components
            current_node['nodes'] = r_nodes
            current_node['child'] = r_structure

            # Check if the current_node dict is empty or not
            if bool(current_node):
                # Check of the node is of unknown data type
                # Get the inner data from the dict
                if(current_node['type'] == "unknown"):
                    structure = current_node['child']
                    nodes = current_node['nodes']
                else:
                    structure.append(current_node)
            else:  # If the dict is empty append None instead of empty dict
                structure.append(None)

        return structure, components, nodes

    def row_structure(self, cRow):
        row_dict = {}
        row_properties = {}
        row_components = []
        row_nodes = []
        row_structure = []
        background_image_list = []
        # Row Title is not scraped in structure
        cCols = self.row_cols(cRow)
        for cCol in cCols:
            col_data_type = cCol.get_attribute('data-type')
            # Traverse the column
            structure, components, nodes = self.col_traverse(
                cCol, background_image_list)

            # Add the col data to row
            row_components.append(col_data_type)
            row_components.extend(components)
            row_nodes.append(col_data_type)

            # Background image
            col_properties = {}
            col_background_image = self.has_background_image(cCol)
            if(col_background_image):
                col_properties['backgroundImage'] = col_background_image
                background_image_list.append('image')
            else:
                col_properties['backgroundImage'] = col_background_image

            # Create dict for column
            col_dict = {}
            col_dict['type'] = col_data_type
            col_dict['properties'] = col_properties
            col_dict['components'] = components
            col_dict['nodes'] = nodes
            col_dict['child'] = structure

            # Append column to row's structure
            row_structure.append(col_dict)

        row_background_image = self.has_background_image(cRow)
        if(row_background_image):
            row_properties['backgroundImage'] = row_background_image
            background_image_list.append('image')
        else:
            row_properties['backgroundImage'] = row_background_image

        row_components = list(filter(None, row_components))
        components_list = numpy.array(row_components)
        component_names, component_counts = numpy.unique(
            components_list, return_counts=True)
        component_names = component_names.tolist()
        component_counts = component_counts.tolist()

        background_image_count = len(background_image_list)
        if 'image' in component_names:
            index = component_names.index('image')
            component_names[index] = component_counts[index] + \
                background_image_count
        else:
            component_names.append('image')
            component_counts.append(background_image_count)

        counts = []
        # Column, Container, Holder
        ignore_components = ['column', 'container', 'holder']
        component_length = len(component_names)
        for i in range(component_length):
            if (component_names[i] not in ignore_components):
                counts.append(
                    {component_names[i].replace(' ', ''): component_counts[i]})

        # Create dict for row
        row_dict['type'] = cRow.get_attribute('data-type')
        row_dict['properties'] = row_properties
        row_dict['components'] = row_components
        row_dict['count'] = counts
        row_dict['componentCount'] = len(counts)
        row_dict['nodes'] = row_nodes
        row_dict['child'] = row_structure

        return row_dict
