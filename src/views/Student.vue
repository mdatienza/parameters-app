<template lang="pug">
  div
   v-layout
    v-flex(xs10, offset-xs1, sm10, offset-sm1, mt-5)
     v-data-table.elevation-1(:headers="headers", :items="student")
      template(slot="items", slot-scope="props")
       tr
        td.text-xs-center {{ props.item.studentno }}
        td.text-xs-center {{ props.item.name }}
        td.text-xs-center {{ props.item.course }}
        td.text-xs-center
         v-icon(color="green", medium, @click="showEditForm(props.item)") edit
         v-icon(color="red", medium, @click="deleteStudent(props.item)") delete_forever
   div
    v-dialog(v-model="dialog", persistent="", max-width="600px")
     v-btn(slot="activator", color="light-green", dark="") Add Student
     v-card
      v-card-title
       span.headline Student Information
      v-card-text
       v-container(grid-list-md)
        v-layout(wrap)
         v-flex(sm12)
          v-text-field(prepend-icon="class", label="Student No", type="text", v-model="newStudent.studentno")
         v-flex(sm12)
          v-text-field(prepend-icon="person", label="Name", type="text", v-model="newStudent.name")
         v-flex(sm12)
          v-combobox(prepend-icon="assignment_ind", :items='items', label='Course', v-model="newStudent.course")
       v-card-actions
        v-spacer
         v-btn(color="primary", @click="createStudent", v-if="!key").white--text Save
         v-btn(color="primary", @click="updateStudent", v-if="key").white--text Update
         v-btn(color="red", @click="closeDialog").white--text Close
    v-snackbar(v-model='snackbar', :bottom="y === 'bottom'", :left="x === 'left'", :multi-line="mode === 'multi-line'", :right="x === 'right'", :timeout='timeout', :top="y === 'top'", :vertical="mode === 'vertical'")
     | {{ text }}
     v-btn(dark="", flat="", @click="snackbar = false")
      v-icon close
</template>

<script>
import firebase from 'firebase'
let studentdb = firebase.database().ref('student')
export default {
  name: 'app',
  firebase: {
    student: studentdb
  },
  data: () => {
    return {
       dialog: false,
       key: null,
       snackbar: false,
       y: 'top',
       x: null,
       mode: '',
       timeout: 3000,
       text: '',
       select: null,
       items: [
          'BSIT',
          'BSCS',
          'BSIE',
          'BSECE'
       ],
       newStudent: {
          studentno: '',
          name: '',
          course: ''
       },
       headers: [
          { text: 'Student No', align: 'center', value: 'studentno' },
          { text: 'Name', align: 'center', value: 'name' },
          { text: 'Course', align: 'center', value: 'course' },
          { text: 'Action', align: 'center', value: '' }
       ]
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.key = null
      this.newStudent.studentno = null
      this.newStudent.name = null
      this.newStudent.course = null
    },
    createStudent () {
      if(this.newStudent.studentno === '' || this.newStudent.name === '' || this.newStudent.course === ''){
        this.snackbar = true
        this.text = 'Please fill-up the information needed'
      }else{
        studentdb.push(this.newStudent)
        this.closeDialog()
      }
    },
    showEditForm (student) {
      this.key = student['.key']
      this.newStudent.studentno = student.studentno
      this.newStudent.name = student.name
      this.newStudent.course = student.course
      this.dialog = true
    },
    updateStudent () {
      if(this.newStudent.studentno === '' || this.newStudent.name === '' || this.newStudent.course === ''){
        this.snackbar = true
        this.text = 'Please fill-up the information needed'
      }else{
        studentdb.child(this.key).update({
          studentno: this.newStudent.studentno,
          name: this.newStudent.name,
          course: this.newStudent.course
        })
        this.closeDialog()
      }
    },
    deleteStudent (student) {
      studentdb.child(student['.key']).remove()
    }
  },
  components: {
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
